

//using Backend.Models;
//using Lab1_Backend.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;

//namespace Lab1_Backend.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class KlientiController : ControllerBase
//    {
//        private readonly LibrariaContext _dbContext;
//        private readonly IConfiguration _configuration;

//        public KlientiController(LibrariaContext dbContext, IConfiguration configuration)
//        {
//            _dbContext = dbContext;
//            _configuration = configuration;
//        }

//        // GET: api/Klienti
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Klienti>>> GetKlients()
//        {
//            return await _dbContext.Klienti.ToListAsync();
//        }

//        // GET: api/Klienti/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Klienti>> GetKlienti(int id)
//        {
//            var klienti = await _dbContext.Klienti.FindAsync(id);

//            if (klienti == null)
//            {
//                return NotFound();
//            }

//            return klienti;
//        }
//        [HttpPut]
//        public async Task<ActionResult> PutKlienti(Klienti k)
//        {
//            if (k == null || k.ID == 0)
//            {
//                return BadRequest("Invalid object or ID.");
//            }

//            _dbContext.Entry(k).State = EntityState.Modified;
//            try
//            {
//                await _dbContext.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                throw;
//            }
//            return Ok();
//        }

//        // PUT: api/Klienti/5
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutKlienti(int id, Klienti klienti)
//        {
//            if (id != klienti.ID)
//            {
//                return BadRequest();
//            }

//            _dbContext.Entry(klienti).State = EntityState.Modified;

//            try
//            {
//                await _dbContext.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!KlientiExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: api/Klienti
//        [HttpPost]
//        public async Task<ActionResult<Klienti>> PostKlienti(Klienti klienti)
//        {
//            _dbContext.Klienti.Add(klienti);
//            await _dbContext.SaveChangesAsync();

//            return CreatedAtAction("GetKlienti", new { id = klienti.ID }, klienti);
//        }
//        [HttpGet("TotalKlienti")]
//        public async Task<ActionResult<int>> GetTotalKlienti()
//        {
//            var total = await _dbContext.Klienti.CountAsync();
//            return total;
//        }
//        // DELETE: api/Klienti/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteKlienti(int id)
//        {
//            var klienti = await _dbContext.Klienti.FindAsync(id);
//            if (klienti == null)
//            {
//                return NotFound();
//            }

//            _dbContext.Klienti.Remove(klienti);
//            await _dbContext.SaveChangesAsync();

//            return NoContent();
//        }
//        [HttpPost("login")]
//        public async Task<ActionResult> Login(LoginModel loginModel)
//        {
//            var user = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.Email == loginModel.Email);

//            if (user != null && user.Password == loginModel.Password)
//            {
//                var token = GenerateJwtToken(user);
//                return Ok(new { Token = token });
//            }
//            else
//            {
//                return Unauthorized();
//            }
//        }

//        //per forgotpassword
//        public class ResetPasswordRequest
//        {
//            public string Email { get; set; }
//            public string NewPassword { get; set; }
//        }

//        [HttpPost("reset-password")]
//        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
//        {
//            var user = await _dbContext.Klienti.FirstOrDefaultAsync(x => x.Email == request.Email);
//            if (user == null)
//            {
//                return NotFound("User with this email does not exist.");
//            }

//            if (!string.IsNullOrEmpty(request.NewPassword))
//            {
//                // Update the user's password
//                user.Password = request.NewPassword;

//                _dbContext.Entry(user).State = EntityState.Modified;
//                await _dbContext.SaveChangesAsync();

//                return Ok("Password has been reset successfully.");
//            }
//            else
//            {
//                // If the new password is not provided, just confirm the email exists
//                return Ok("Email confirmed. You can now reset your password.");
//            }
//        }
//        /*
//                 }
//        //per user profile
//        public class UpdateProfileRequest
//        {
//            public string Emri { get; set; }
//            public string Mbiemri { get; set; }
//            public string Email { get; set; }
//            public string KlientiQyteti { get; set; }
//            public string KlientiGjinia { get; set; }
//        }
//        [HttpPost("update-profile")]
//        public async Task<ActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
//        {
//            try
//            {
//                var userId = GetUserIdFromToken(); // Implement this method to get the user ID from the token
//                var user = await _dbContext.Klienti.FindAsync(userId);

//                if (user == null)
//                {
//                    return NotFound("User not found.");
//                }

//                user.Emri = request.Emri;
//                user.Mbiemri = request.Mbiemri;
//                user.Email = request.Email;
//                user.KlientiQyteti = request.KlientiQyteti;
//                user.KlientiGjinia = request.KlientiGjinia;

//                _dbContext.Entry(user).State = EntityState.Modified;
//                await _dbContext.SaveChangesAsync();

//                return Ok("Profile updated successfully.");
//            }
//            catch (ArgumentNullException ex)
//            {
//                return BadRequest(ex.Message);
//            }
//            catch (Exception)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the profile.");
//            }
//        }






//        private int GetUserIdFromToken()
//        {
//            var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();

//            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
//            {
//                throw new ArgumentNullException("token", "Token cannot be null or empty.");
//            }

//            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

//            var handler = new JwtSecurityTokenHandler();
//            var jwtToken = handler.ReadJwtToken(token);

//            if (jwtToken == null)
//            {
//                throw new ArgumentNullException("token", "Invalid token.");
//            }

//            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "ID");

//            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
//            {
//                throw new ArgumentNullException("token", "User ID claim not found or invalid.");
//            }

//            return userId;
//        }


//         */

//        private string GenerateJwtToken(Klienti user)
//        {
//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: _configuration["Jwt:Issuer"],
//                audience: _configuration["Jwt:Audience"],
//                claims: new[] {
//                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
//                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//                },
//                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])),
//                signingCredentials: creds
//            );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//        private bool KlientiExists(int id)
//        {
//            return _dbContext.Klienti.Any(e => e.ID == id);
//        }
//    }
//}
