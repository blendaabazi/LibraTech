using System.ComponentModel.DataAnnotations.Schema;

namespace Lab1_Backend.Models
{
    public class Libri
    {
        public int ID { get; set; }
        public string ISBN { get; set; }
        public string? Titulli { get; set; }
        public string? Pershkrimi { get; set; }

        public int? AutoriID { get; set; }

        [ForeignKey("AutoriID")]
        public Autori Autori { get; set; }

        public int NrFaqeve { get; set; }

        public int? KategoriaID { get; set; }

        [ForeignKey("KategoriaID")]
        public Kategoria Kategoria { get; set; }

        public int VitiPublikimit { get; set; }
        
        public int? ShtepiaBotueseID { get; set; }

        [ForeignKey("ShtepiaBotueseID")]
        public ShtepiaBotuese ShtepiaBotuese { get; set; }

        public int? GjuhaID { get; set; }

        [ForeignKey("GjuhaID")]
        public Gjuha Gjuha { get; set; }
      
        public double Cmimi { get; set; }
        public int Sasia { get; set; }
        public string ImgPath { get; set; }



    }
}
