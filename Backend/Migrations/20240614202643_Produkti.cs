using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Produkti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libri_Porosia_PorosiaID",
                table: "Libri");

            migrationBuilder.DropForeignKey(
                name: "FK_MjeteShkollore_Porosia_PorosiaID",
                table: "MjeteShkollore");

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

            migrationBuilder.CreateTable(
                name: "Produkti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PorosiaID = table.Column<int>(type: "int", nullable: false),
                    LibriID = table.Column<int>(type: "int", nullable: false),
                    MjeteShkolloreID = table.Column<int>(type: "int", nullable: false)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produkti");

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

            migrationBuilder.CreateIndex(
                name: "IX_MjeteShkollore_PorosiaID",
                table: "MjeteShkollore",
                column: "PorosiaID");

            migrationBuilder.CreateIndex(
                name: "IX_Libri_PorosiaID",
                table: "Libri",
                column: "PorosiaID");

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
    }
}
