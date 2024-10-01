using System.Threading.Tasks;
using Lab1_Backend.Models;
using Lab1_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lab1_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthorizationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginModel loginModel)
        {
            var (token, refreshToken, roli, id, emri, mbiemri, gjinia, qyteti, email, expiration) = await _authenticationService.AuthenticateAndGetJwtToken(loginModel);

            if (token != null)
            {
                return Ok(new
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    Roli = roli,
                    ID = id,
                    Emri = emri,
                    Mbiemri = mbiemri,
                    KlientiGjinia = gjinia,
                    KlientiQyteti = qyteti,
                    Email = email,
                    TokenExpiration = expiration
                });
            }
            else
            {
                return Unauthorized("Invalid credentials.");
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterModel registerModel)
        {
            var result = await _authenticationService.RegisterUser(registerModel);

            if (result)
            {
                return Ok("Registration successful.");
            }
            else
            {
                return BadRequest("Registration failed: User already exists.");
            }
        }

    
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            var logoutResult = await _authenticationService.Logout();

            if (logoutResult)
            {
                return Ok("Logout successful.");
            }
            else
            {
                return BadRequest("Logout failed.");
            }
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPost("assign-role")]
        public async Task<ActionResult> AssignRole(AssignRoleModel assignRoleModel)
        {
            var result = await _authenticationService.AssignRole(assignRoleModel);

            if (result)
            {
                return Ok("Role assigned successfully.");
            }
            else
            {
                return BadRequest("Role assignment failed.");
            }
        }
        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<ActionResult> RefreshToken(TokenRequestModel tokenRequest)
        {
            // Kontrollo nëse refresh token-i është i pranishëm
            if (string.IsNullOrEmpty(tokenRequest.RefreshToken))
            {
                return BadRequest("Refresh token is required.");
            }

            // Thirr metodën për të refresh token-in dhe merr rezultatin
            var result = await _authenticationService.RefreshToken(tokenRequest);

            // Kontrollo nëse rezultati është null, që do të thotë se refresh token-i është i pavlefshëm
            if (result == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            // Kthe akses token-in dhe refresh token-in e ri
            return Ok(new
            {
                Token = result.Token,
                RefreshToken = result.RefreshToken,
                TokenExpiration = DateTime.UtcNow.AddMinutes(30).Ticks
            });
        }
    }
}
