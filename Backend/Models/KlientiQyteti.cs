﻿using System.ComponentModel.DataAnnotations;

namespace Lab1_Backend.Models
{
    public class KlientiQyteti
    {
        [Key]
        public int KlientiQytetiID { get; set; }

        [Required]
        public string Qyteti { get; set; }
    }
}
