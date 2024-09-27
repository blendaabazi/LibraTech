using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab1_Backend.Models
{
    public class Porosia
    {
        public int ID { get; set; }

        [Required]
        public int KlientiID { get; set; }  // Foreign key for Klienti

        [ForeignKey("KlientiID")]
        public Klienti Klienti { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "CmimiTotal must be a positive number.")]
        public double CmimiTotal { get; set; }

        [Required]
        public DateTime Data { get; set; }
        public List<Produkti> Produktet { get; set; }
    }
}
