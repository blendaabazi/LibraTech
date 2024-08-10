//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.AspNetCore.Http;

//namespace Lab1_Backend.Services
//{
//    public class AuthenticationService : IAuthenticationService
//    {
//        private readonly LibrariaContext _dbContext;
//        private readonly IConfiguration _configuration;
//        private readonly IHttpContextAccessor _httpContextAccessor;

//        public AuthenticationService(LibrariaContext dbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
//        {
//            _dbContext = dbContext;
//            _configuration = configuration;
//            _httpContextAccessor = httpContextAccessor;
//        }

//        public async Task<(string Token, string Roli, int ID, string Emri, string Mbiemri, string KlientiGjinia, string KlientiQyteti, string Email, string Password)> AuthenticateAndGetJwtToken(LoginModel loginModel)
//        {
//            Klienti? user = null;
//            try
//            {
//                user = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.Email == loginModel.Email);
//            }
//            catch (Exception ex)
//            {

//            }

//            if (user != null && user.Password == loginModel.Password)
//            {
//                var token = GenerateJwtToken(user);
//                return (token, user.KlientiRoli, user.ID, user.Emri, user.Mbiemri, user.KlientiGjinia, user.KlientiQyteti, user.Email, user.Password);
//            }

//            return (null, null, 0, null, null, null, null, null, null);
//        }

//        public async Task<bool> RegisterUser(RegisterModel registerModel)
//        {
//            var existingUser = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.Email == registerModel.Email);

//            if (existingUser != null)
//            {
//                return false; // User already exists
//            }

//            var newUser = new Klienti
//            {
//                Emri = registerModel.Emri,
//                Mbiemri = registerModel.Mbiemri,
//                KlientiGjinia = registerModel.KlientiGjinia,
//                KlientiQyteti = registerModel.KlientiQyteti,
//                KlientiRoli = "User", // Default role for 'User'
//                Email = registerModel.Email,
//                Password = registerModel.Password
//            };

//            _dbContext.Klienti.Add(newUser);
//            await _dbContext.SaveChangesAsync();

//            return true;
//        }

//        public async Task<bool> AssignRole(AssignRoleModel assignRoleModel)
//        {
//            var user = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.ID == assignRoleModel.UserId);

//            if (user != null)
//            {
//                user.KlientiRoli = assignRoleModel.Role;
//                await _dbContext.SaveChangesAsync();
//                return true;
//            }

//            return false;
//        }

//        public async Task<bool> Logout()
//        {
//            try
//            {
//                _httpContextAccessor.HttpContext.Response.Cookies.Delete("jwtToken");
//                return true;
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Error during logout: {ex.Message}");
//                return false;
//            }
//        }

//        private string GenerateJwtToken(Klienti user)
//        {
//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var claims = new[]
//            {
//        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
//        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//        new Claim("Roli", user.KlientiRoli),
//        new Claim("ID", user.ID.ToString()),
//        new Claim("Emri", user.Emri),
//        new Claim("Mbiemri", user.Mbiemri),
//        new Claim("KlientiGjinia", user.KlientiGjinia),
//        new Claim("KlientiQyteti", user.KlientiQyteti),
//        new Claim("Email", user.Email)
//    };

//            var token = new JwtSecurityToken(
//                issuer: _configuration["Jwt:Issuer"],
//                audience: _configuration["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])),
//                signingCredentials: creds
//            );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }

//    }
//}
