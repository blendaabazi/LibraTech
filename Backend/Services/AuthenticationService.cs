using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Lab1_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace Lab1_Backend.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly LibrariaContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticationService(LibrariaContext dbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<(string Token, string RefreshToken, string Roli, int ID, string Emri, string Mbiemri, string KlientiGjinia, string KlientiQyteti, string Email)> AuthenticateAndGetJwtToken(LoginModel loginModel)
        {
            Klienti? user = null;
            try
            {
                user = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.Email == loginModel.Email);
            }
            catch (Exception ex)
            {
                // Log exception (implement logging as needed)
                Console.WriteLine($"Exception during authentication: {ex.Message}");
                return (null, null, null, 0, null, null, null, null, null);
            }

            if (user != null)
            {
                Console.WriteLine($"User found: {user.Email}");
                if (loginModel.Password == user.Password) // Compare plain text password
                {
                    var token = GenerateJwtToken(user);
                    var refreshToken = GenerateRefreshToken();

                    var refreshTokenEntity = new RefreshToken
                    {
                        Token = refreshToken,
                        UserId = user.ID,
                        ExpiresAt = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenExpiryDays"])),
                        IsUsed = false,
                        IsRevoked = false,
                        CreatedAt = DateTime.UtcNow
                    };

                    _dbContext.RefreshToken.Add(refreshTokenEntity);
                    await _dbContext.SaveChangesAsync();

                    return (token, refreshToken, user.KlientiRoli, user.ID, user.Emri, user.Mbiemri, user.KlientiGjinia, user.KlientiQyteti, user.Email);
                }
                else
                {
                    Console.WriteLine("Invalid password.");
                }
            }
            else
            {
                Console.WriteLine("User not found.");
            }

            return (null, null, null, 0, null, null, null, null, null);
        }

        public async Task<bool> RegisterUser(RegisterModel registerModel)
        {
            var existingUser = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.Email == registerModel.Email);

            if (existingUser != null)
            {
                return false; // User already exists
            }

            var newUser = new Klienti
            {
                Emri = registerModel.Emri,
                Mbiemri = registerModel.Mbiemri,
                KlientiGjinia = registerModel.KlientiGjinia,
                KlientiQyteti = registerModel.KlientiQyteti,
                KlientiRoli = "User", // Default role for 'User'
                Email = registerModel.Email,
                Password = registerModel.Password // Store plain text password
            };

            _dbContext.Klienti.Add(newUser);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        private string GenerateJwtToken(Klienti user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, user.KlientiRoli),
                new Claim("ID", user.ID.ToString()),
                new Claim("Emri", user.Emri),
                new Claim("Mbiemri", user.Mbiemri),
                new Claim("KlientiGjinia", user.KlientiGjinia),
                new Claim("KlientiQyteti", user.KlientiQyteti),
                new Claim("Email", user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<bool> AssignRole(AssignRoleModel assignRoleModel)
        {
            var user = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.ID == assignRoleModel.UserId);

            if (user != null)
            {
                user.KlientiRoli = assignRoleModel.Role;
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> Logout()
        {
            try
            {
                var context = _httpContextAccessor.HttpContext;
                if (context != null)
                {
                    // Merrni email-in nga claims
                    var userEmail = context.User?.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;
                    if (userEmail != null)
                    {
                        var user = await _dbContext.Klienti.Include(u => u.RefreshTokens)
                                                         .FirstOrDefaultAsync(u => u.Email == userEmail);

                        if (user != null)
                        {
                            foreach (var rt in user.RefreshTokens.Where(rt => !rt.IsRevoked && !rt.IsUsed))
                            {
                                rt.IsRevoked = true;
                            }

                            _dbContext.RefreshToken.UpdateRange(user.RefreshTokens);
                            await _dbContext.SaveChangesAsync();
                        }
                    }

                    var cookieOptions = new CookieOptions
                    {
                        Path = "/",
                        HttpOnly = true,
                        Secure = true
                    };

                    context.Response.Cookies.Delete("jwtToken", cookieOptions);

                    // Log success
                    Console.WriteLine("User logged out and refresh tokens revoked successfully.");
                    return true;
                }
                else
                {
                    Console.WriteLine("HttpContext is null.");
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error during logout: {ex.Message}");
                return false;
            }
        }

        public async Task<TokenResponseModel> RefreshToken(TokenRequestModel tokenRequest)
        {
            var refreshToken = await _dbContext.RefreshToken
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == tokenRequest.RefreshToken);

            if (refreshToken == null || refreshToken.IsUsed || refreshToken.IsRevoked || refreshToken.ExpiresAt < DateTime.UtcNow)
            {
                // Log or return an error
                Console.WriteLine("Refresh token is invalid or expired.");
                return null;
            }

            // Mark the refresh token as used
            refreshToken.IsUsed = true;
            _dbContext.RefreshToken.Update(refreshToken);
            await _dbContext.SaveChangesAsync();

            var user = refreshToken.User;
            var newJwtToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            // Save the new refresh token
            var newRefreshTokenEntity = new RefreshToken
            {
                Token = newRefreshToken,
                UserId = user.ID,
                ExpiresAt = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenExpiryDays"])),
                IsUsed = false,
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.RefreshToken.Add(newRefreshTokenEntity);
            await _dbContext.SaveChangesAsync();

            return new TokenResponseModel
            {
                Token = newJwtToken,
                RefreshToken = newRefreshToken
            };
        }

    }
}
