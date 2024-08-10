using Lab1_Backend.Models;
using System.Threading.Tasks;

namespace Lab1_Backend.Services
{
    public interface IAuthenticationService
    {
        Task<(string Token, string Roli, int ID, string Emri, string Mbiemri, string KlientiGjinia, string KlientiQyteti, string Email, string Password)> AuthenticateAndGetJwtToken(LoginModel loginModel); // Ndryshoni këtu
        Task<bool> RegisterUser(RegisterModel registerModel);
        Task<bool> AssignRole(AssignRoleModel assignRoleModel);
        Task<bool> Logout();
    }
}
