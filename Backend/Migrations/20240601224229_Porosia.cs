using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Porosia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PorosiaID",
                table: "MjeteShkollore",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PorosiaID",
                table: "Libri",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "libraria",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lokacioni = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Furnizimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_libraria", x => x.ID);
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

            migrationBuilder.CreateIndex(
                name: "IX_MjeteShkollore_PorosiaID",
                table: "MjeteShkollore",
                column: "PorosiaID");

            migrationBuilder.CreateIndex(
                name: "IX_Libri_PorosiaID",
                table: "Libri",
                column: "PorosiaID");

            migrationBuilder.CreateIndex(
                name: "IX_Porosia_KlientiID",
                table: "Porosia",
                column: "KlientiID");

            migrationBuilder.AddForeignKey(
                name: "FK_Libri_Porosia_PorosiaID",
                table: "Libri",
                column: "PorosiaID",
                principalTable: "Porosia",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_MjeteShkollore_Porosia_PorosiaID",
                table: "MjeteShkollore",
                column: "PorosiaID",
                principalTable: "Porosia",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libri_Porosia_PorosiaID",
                table: "Libri");

            migrationBuilder.DropForeignKey(
                name: "FK_MjeteShkollore_Porosia_PorosiaID",
                table: "MjeteShkollore");

            migrationBuilder.DropTable(
                name: "libraria");

            migrationBuilder.DropTable(
                name: "Porosia");

            migrationBuilder.DropIndex(
                name: "IX_MjeteShkollore_PorosiaID",
                table: "MjeteShkollore");

            migrationBuilder.DropIndex(
                name: "IX_Libri_PorosiaID",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "PorosiaID",
                table: "MjeteShkollore");

            migrationBuilder.DropColumn(
                name: "PorosiaID",
                table: "Libri");
        }
    }
}
