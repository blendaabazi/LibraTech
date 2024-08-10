using System.ComponentModel.DataAnnotations;

namespace Lab1_Backend.Models
{
    public class RegisterModel
    {
        [Required]
        public string Emri { get; set; }

        [Required]
        public string Mbiemri { get; set; }

        [Required]
        public string KlientiGjinia { get; set; }

        [Required]
        public string KlientiQyteti { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
