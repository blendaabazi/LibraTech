//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace Lab1_Backend.Models
//{
//    public class Produkti
//    {
//        public int ID { get; set; }

//        [Required]
//        public int PorosiaID { get; set; } 

//        [ForeignKey("PorosiaID")]
//        public Porosia Porosia { get; set; }

//        public int? LibriID { get; set; }  

//        [ForeignKey("LibriID")]
//        public Libri Libri { get; set; }

//        public int? MjeteShkolloreID { get; set; } 

//        [ForeignKey("MjeteShkolloreID")]
//        public MjeteShkollore MjeteShkollore { get; set; }
//    }
//}
