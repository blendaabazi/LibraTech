using System.ComponentModel.DataAnnotations.Schema;

namespace Lab1_Backend.Models
{
    public class Klienti
    {
        public int ID { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int KlientiGjiniaID { get; set; }

        [ForeignKey("KlientiGjiniaID")]
        public KlientiGjinia KlientiGjinia { get; set; }

        public int KlientiQytetiID { get; set; }

        [ForeignKey("KlientiQytetiID")]
        public KlientiQyteti KlientiQyteti { get; set; }

        public int KlientiRoliID { get; set; }

        [ForeignKey("KlientiRoliID")]
        public KlientiRoli KlientiRoli { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }



    }

}
