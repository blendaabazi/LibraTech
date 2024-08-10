using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePorosia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PorosiItem");

            migrationBuilder.RenameColumn(
                name: "Totali",
                table: "Porosia",
                newName: "CmimiTotal");

            migrationBuilder.RenameColumn(
                name: "DataPorosise",
                table: "Porosia",
                newName: "Data");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Porosia",
                newName: "DataPorosise");

            migrationBuilder.RenameColumn(
                name: "CmimiTotal",
                table: "Porosia",
                newName: "Totali");

            migrationBuilder.CreateTable(
                name: "PorosiItem",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LibriID = table.Column<int>(type: "int", nullable: false),
                    MjeteShkolloreID = table.Column<int>(type: "int", nullable: false),
                    PorosiaID = table.Column<int>(type: "int", nullable: false),
                    Cmimi = table.Column<double>(type: "float", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PorosiItem", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PorosiItem_Libri_LibriID",
                        column: x => x.LibriID,
                        principalTable: "Libri",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PorosiItem_MjeteShkollore_MjeteShkolloreID",
                        column: x => x.MjeteShkolloreID,
                        principalTable: "MjeteShkollore",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PorosiItem_Porosia_PorosiaID",
                        column: x => x.PorosiaID,
                        principalTable: "Porosia",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PorosiItem_LibriID",
                table: "PorosiItem",
                column: "LibriID");

            migrationBuilder.CreateIndex(
                name: "IX_PorosiItem_MjeteShkolloreID",
                table: "PorosiItem",
                column: "MjeteShkolloreID");

            migrationBuilder.CreateIndex(
                name: "IX_PorosiItem_PorosiaID",
                table: "PorosiItem",
                column: "PorosiaID");
        }
    }
}
