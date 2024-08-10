using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Libri : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DimensionetMSh");

            migrationBuilder.DropTable(
                name: "Furnizimi");

            migrationBuilder.DropTable(
                name: "KlientiGjinia");

            migrationBuilder.DropTable(
                name: "KlientiQyteti");

            migrationBuilder.DropTable(
                name: "KlientiRoli");

            migrationBuilder.DropTable(
                name: "libraria");

            migrationBuilder.DropTable(
                name: "LokacioniLibraria");

            migrationBuilder.DropTable(
                name: "NgjyraMSh");

            migrationBuilder.DropTable(
                name: "NrFaqeve");

            migrationBuilder.DropTable(
                name: "ProdhuesiMSh");

            migrationBuilder.DropTable(
                name: "Produkti");

            migrationBuilder.DropTable(
                name: "QytetiLibraria");

            migrationBuilder.DropTable(
                name: "ShtetiMSh");

            migrationBuilder.DropTable(
                name: "Stafi");

            migrationBuilder.DropTable(
                name: "StafiGjinia");

            migrationBuilder.DropTable(
                name: "StafiOrari");

            migrationBuilder.DropTable(
                name: "StafiSchedule");

            migrationBuilder.DropTable(
                name: "StafiSektori");

            migrationBuilder.DropTable(
                name: "Tipi");

            migrationBuilder.DropTable(
                name: "MjeteShkollore");

            migrationBuilder.DropTable(
                name: "Porosia");

            migrationBuilder.DropTable(
                name: "Klienti");

            migrationBuilder.DropColumn(
                name: "Gjuha",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "Kategoria",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "ShtepiaBotuese",
                table: "Libri");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "ShtepiaBotuese",
                newName: "ShtepiaBotueseID");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Kategoria",
                newName: "KategoriaID");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Gjuha",
                newName: "GjuhaID");

            migrationBuilder.AlterColumn<int>(
                name: "NrFaqeve",
                table: "Libri",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "GjuhaID",
                table: "Libri",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KategoriaID",
                table: "Libri",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShtepiaBotueseID",
                table: "Libri",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Libri_GjuhaID",
                table: "Libri",
                column: "GjuhaID");

            migrationBuilder.CreateIndex(
                name: "IX_Libri_KategoriaID",
                table: "Libri",
                column: "KategoriaID");

            migrationBuilder.CreateIndex(
                name: "IX_Libri_ShtepiaBotueseID",
                table: "Libri",
                column: "ShtepiaBotueseID");

            migrationBuilder.AddForeignKey(
                name: "FK_Libri_Gjuha_GjuhaID",
                table: "Libri",
                column: "GjuhaID",
                principalTable: "Gjuha",
                principalColumn: "GjuhaID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Libri_Kategoria_KategoriaID",
                table: "Libri",
                column: "KategoriaID",
                principalTable: "Kategoria",
                principalColumn: "KategoriaID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Libri_ShtepiaBotuese_ShtepiaBotueseID",
                table: "Libri",
                column: "ShtepiaBotueseID",
                principalTable: "ShtepiaBotuese",
                principalColumn: "ShtepiaBotueseID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libri_Gjuha_GjuhaID",
                table: "Libri");

            migrationBuilder.DropForeignKey(
                name: "FK_Libri_Kategoria_KategoriaID",
                table: "Libri");

            migrationBuilder.DropForeignKey(
                name: "FK_Libri_ShtepiaBotuese_ShtepiaBotueseID",
                table: "Libri");

            migrationBuilder.DropIndex(
                name: "IX_Libri_GjuhaID",
                table: "Libri");

            migrationBuilder.DropIndex(
                name: "IX_Libri_KategoriaID",
                table: "Libri");

            migrationBuilder.DropIndex(
                name: "IX_Libri_ShtepiaBotueseID",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "GjuhaID",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "KategoriaID",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "ShtepiaBotueseID",
                table: "Libri");

            migrationBuilder.RenameColumn(
                name: "ShtepiaBotueseID",
                table: "ShtepiaBotuese",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "KategoriaID",
                table: "Kategoria",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "GjuhaID",
                table: "Gjuha",
                newName: "ID");

            migrationBuilder.AlterColumn<string>(
                name: "NrFaqeve",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Gjuha",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Kategoria",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShtepiaBotuese",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: true);

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
                name: "Klienti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiGjinia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiQyteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiRoli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "libraria",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Furnizimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lokacioni = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_libraria", x => x.ID);
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
                    Cmimi = table.Column<double>(type: "float", nullable: false),
                    DimensionetMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgjyraMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProdhuesiMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false),
                    ShtetiMSh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipi = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    Pervoja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StafiGjinia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StafiOrari = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StafiSchedule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StafiSektori = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipCode = table.Column<int>(type: "int", nullable: false)
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
                name: "StafiSchedule",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Schedule = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StafiSchedule", x => x.Id);
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

            migrationBuilder.CreateTable(
                name: "Porosia",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KlientiID = table.Column<int>(type: "int", nullable: false),
                    CmimiTotal = table.Column<double>(type: "float", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porosia", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Porosia_Klienti_KlientiID",
                        column: x => x.KlientiID,
                        principalTable: "Klienti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Produkti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LibriID = table.Column<int>(type: "int", nullable: false),
                    MjeteShkolloreID = table.Column<int>(type: "int", nullable: false),
                    PorosiaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produkti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Produkti_Libri_LibriID",
                        column: x => x.LibriID,
                        principalTable: "Libri",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Produkti_MjeteShkollore_MjeteShkolloreID",
                        column: x => x.MjeteShkolloreID,
                        principalTable: "MjeteShkollore",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Produkti_Porosia_PorosiaID",
                        column: x => x.PorosiaID,
                        principalTable: "Porosia",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Porosia_KlientiID",
                table: "Porosia",
                column: "KlientiID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_LibriID",
                table: "Produkti",
                column: "LibriID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_MjeteShkolloreID",
                table: "Produkti",
                column: "MjeteShkolloreID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_PorosiaID",
                table: "Produkti",
                column: "PorosiaID");
        }
    }
}
