// Services/IAuthenticationService.cs
using System.Threading.Tasks;
using Lab1_Backend.Models;

namespace Lab1_Backend.Services
{
    public interface IAuthenticationService
    {
        Task<(string Token, string RefreshToken, string Roli, int ID, string Emri, string Mbiemri, string KlientiGjinia, string KlientiQyteti, string Email)> AuthenticateAndGetJwtToken(LoginModel loginModel);
        Task<bool> RegisterUser(RegisterModel registerModel);
        Task<bool> AssignRole(AssignRoleModel assignRoleModel);
        Task<bool> Logout();
        Task<TokenResponseModel> RefreshToken(TokenRequestModel tokenRequest);
    }
}
