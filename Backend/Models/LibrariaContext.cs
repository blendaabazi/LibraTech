
using Backend.Models;
using Microsoft.EntityFrameworkCore;
    namespace Lab1_Backend.Models
    {
        public class LibrariaContext : DbContext
        {
            public LibrariaContext(DbContextOptions<LibrariaContext> options) : base(options)
            {

            }
            /*public DbSet<Libraria> libraria { get; set; }*/
            //public DbSet<MjeteShkollore> MjeteShkollore { get; set; }
            public DbSet<Tipi> Tipi { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        public DbSet<Libri> Libri { get; set; }
            public DbSet<MjeteShkollore> MjeteShkollore { get; set; }


        public DbSet<Autori> Autori { get; set; }
           
     
           public DbSet<ShtetiMSh> ShtetiMSh { get; set; }
           
        public DbSet<ProdhuesiMSh> ProdhuesiMSh { get; set; }
            public DbSet<ShtepiaBotuese> ShtepiaBotuese { get; set; }
            public DbSet<Gjuha> Gjuha { get; set; }
            public DbSet<Kategoria> Kategoria { get; set; }




        /*Klienti*/
        public DbSet<Klienti> Klienti { get; set; }
        public DbSet<KlientiGjinia> KlientiGjinia { get; set; }
        public DbSet<KlientiQyteti> KlientiQyteti { get; set; }
        public DbSet<KlientiRoli> KlientiRoli { get; set; }

        /*Stafi*/
        //public DbSet<Stafi> Stafi { get; set; }
        //public DbSet<StafiGjinia> StafiGjinia { get; set; }
        //public DbSet<StafiOrari> StafiOrari { get; set; }
        //public DbSet<StafiSektori> StafiSektori { get; set; }

        //public DbSet<StafiSchedule> StafiSchedule { get; set; }

        /*Porosia*/

        public DbSet<Porosia> Porosia { get; set; }
        public DbSet<Produkti> Produkti { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Relacionimi mes Klienti dhe RefreshToken
        //    modelBuilder.Entity<RefreshToken>()
        //        .HasOne(rt => rt.User)
        //        .WithMany(u => u.RefreshTokens)
        //        .HasForeignKey(rt => rt.UserId);

        //    base.OnModelCreating(modelBuilder);
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Produkti>()
                .Property(p => p.LibriID)
                .IsRequired(false); // Sigurohuni që LibriID lejohet null

            modelBuilder.Entity<Produkti>()
                .Property(p => p.MjeteShkolloreID)
                .IsRequired(false); // Sigurohuni që MjeteShkolloreID lejohet null
        }











    }
    }