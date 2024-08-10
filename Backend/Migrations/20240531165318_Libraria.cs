using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Libraria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Autori",
                columns: table => new
                {
                    AutoriID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autori", x => x.AutoriID);
                });

            migrationBuilder.CreateTable(
                name: "DimensionetMSh",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dimensione = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimensionetMSh", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Furnizimi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Kompania = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Furnizimi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Gjuha",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    gjuha = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gjuha", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kategoria",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kategoria = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoria", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Klienti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiGjinia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiQyteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiRoli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klienti", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "KlientiGjinia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KlientiGjinia", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KlientiQyteti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KlientiQyteti", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KlientiRoli",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Roli = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KlientiRoli", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Libri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ISBN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Autori = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NrFaqeve = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kategoria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VitiPublikimit = table.Column<int>(type: "int", nullable: false),
                    ShtepiaBotuese = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gjuha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cmimi = table.Column<double>(type: "float", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libri", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "LokacioniLibraria",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lokacioni = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LokacioniLibraria", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MjeteShkollore",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DimensionetMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShtetiMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProdhuesiMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgjyraMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cmimi = table.Column<double>(type: "float", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MjeteShkollore", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "NgjyraMSh",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ngjyra = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NgjyraMSh", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "NrFaqeve",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nrfaqeve = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NrFaqeve", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ProdhuesiMSh",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Prodhuesi = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdhuesiMSh", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "QytetiLibraria",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QytetiLibraria", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ShtepiaBotuese",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shtepiaBotuese = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShtepiaBotuese", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ShtetiMSh",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Shteti = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShtetiMSh", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Stafi",
                columns: table => new
                {
                    IDStafi = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipCode = table.Column<int>(type: "int", nullable: false),
                    StafiGjinia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StafiOrari = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StafiSektori = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pervoja = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stafi", x => x.IDStafi);
                });

            migrationBuilder.CreateTable(
                name: "StafiGjinia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StafiGjinia", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StafiOrari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Orari = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StafiOrari", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StafiSektori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sektori = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StafiSektori", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tipi",
                columns: table => new
                {
                    TipiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipiEmri = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tipi", x => x.TipiID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Autori");

            migrationBuilder.DropTable(
                name: "DimensionetMSh");

            migrationBuilder.DropTable(
                name: "Furnizimi");

            migrationBuilder.DropTable(
                name: "Gjuha");

            migrationBuilder.DropTable(
                name: "Kategoria");

            migrationBuilder.DropTable(
                name: "Klienti");

            migrationBuilder.DropTable(
                name: "KlientiGjinia");

            migrationBuilder.DropTable(
                name: "KlientiQyteti");

            migrationBuilder.DropTable(
                name: "KlientiRoli");

            migrationBuilder.DropTable(
                name: "Libri");

            migrationBuilder.DropTable(
                name: "LokacioniLibraria");

            migrationBuilder.DropTable(
                name: "MjeteShkollore");

            migrationBuilder.DropTable(
                name: "NgjyraMSh");

            migrationBuilder.DropTable(
                name: "NrFaqeve");

            migrationBuilder.DropTable(
                name: "ProdhuesiMSh");

            migrationBuilder.DropTable(
                name: "QytetiLibraria");

            migrationBuilder.DropTable(
                name: "ShtepiaBotuese");

            migrationBuilder.DropTable(
                name: "ShtetiMSh");

            migrationBuilder.DropTable(
                name: "Stafi");

            migrationBuilder.DropTable(
                name: "StafiGjinia");

            migrationBuilder.DropTable(
                name: "StafiOrari");

            migrationBuilder.DropTable(
                name: "StafiSektori");

            migrationBuilder.DropTable(
                name: "Tipi");
        }
    }
}
