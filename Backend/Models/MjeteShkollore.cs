using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab1_Backend.Models
{
    public class MjeteShkollore
    {
        [Key]
        public int ID { get; set; }
        public string Pershkrimi { get; set; }


        public int? TipiID { get; set; }

        [ForeignKey("TipiID")]
        public Tipi Tipi { get; set; }


        public int? ShtetiMShID { get; set; }

        [ForeignKey("ShtetiMShID")]
        public ShtetiMSh ShtetiMSh { get; set; }
       
   
        public int? ProdhuesiMShID { get; set; }

        [ForeignKey("ProdhuesiMShID")]
        public ProdhuesiMSh ProdhuesiMSh { get; set; }


        public string ImgPath { get; set; }
        public double Cmimi { get; set; }
        public int Sasia { get; set; }


    }
}
