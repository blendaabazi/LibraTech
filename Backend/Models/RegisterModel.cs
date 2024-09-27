using System.ComponentModel.DataAnnotations;

namespace Lab1_Backend.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Emri is required")]
        public string Emri { get; set; }

        [Required(ErrorMessage = "Mbiemri is required")]
        public string Mbiemri { get; set; }

        [Required(ErrorMessage = "KlientiGjinia is required")]
        public string KlientiGjinia { get; set; }

        [Required(ErrorMessage = "KlientiQyteti is required")]
        public string KlientiQyteti { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "ConfirmPassword is required")]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
