using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class KlientiCrud : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KlientiGjinia",
                columns: table => new
                {
                    KlientiGjiniaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KlientiGjinia", x => x.KlientiGjiniaID);
                });

            migrationBuilder.CreateTable(
                name: "KlientiQyteti",
                columns: table => new
                {
                    KlientiQytetiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KlientiQyteti", x => x.KlientiQytetiID);
                });

            migrationBuilder.CreateTable(
                name: "KlientiRoli",
                columns: table => new
                {
                    KlientiRoliID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Roli = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KlientiRoli", x => x.KlientiRoliID);
                });

            migrationBuilder.CreateTable(
                name: "Klienti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientiGjiniaID = table.Column<int>(type: "int", nullable: false),
                    KlientiQytetiID = table.Column<int>(type: "int", nullable: false),
                    KlientiRoliID = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klienti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Klienti_KlientiGjinia_KlientiGjiniaID",
                        column: x => x.KlientiGjiniaID,
                        principalTable: "KlientiGjinia",
                        principalColumn: "KlientiGjiniaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Klienti_KlientiQyteti_KlientiQytetiID",
                        column: x => x.KlientiQytetiID,
                        principalTable: "KlientiQyteti",
                        principalColumn: "KlientiQytetiID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Klienti_KlientiRoli_KlientiRoliID",
                        column: x => x.KlientiRoliID,
                        principalTable: "KlientiRoli",
                        principalColumn: "KlientiRoliID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Klienti_KlientiGjiniaID",
                table: "Klienti",
                column: "KlientiGjiniaID");

            migrationBuilder.CreateIndex(
                name: "IX_Klienti_KlientiQytetiID",
                table: "Klienti",
                column: "KlientiQytetiID");

            migrationBuilder.CreateIndex(
                name: "IX_Klienti_KlientiRoliID",
                table: "Klienti",
                column: "KlientiRoliID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Klienti");

            migrationBuilder.DropTable(
                name: "KlientiGjinia");

            migrationBuilder.DropTable(
                name: "KlientiQyteti");

            migrationBuilder.DropTable(
                name: "KlientiRoli");
        }
    }
}
