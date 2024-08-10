using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Shporta : Migration
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
                    PorosiaID = table.Column<int>(type: "int", nullable: false),
                    LibriID = table.Column<int>(type: "int", nullable: false),
                    MjeteShkolloreID = table.Column<int>(type: "int", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false),
                    Cmimi = table.Column<double>(type: "float", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Shporta",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KlientiID = table.Column<int>(type: "int", nullable: false),
                    LibriID = table.Column<int>(type: "int", nullable: false),
                    MjeteShkolloreID = table.Column<int>(type: "int", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false),
                    DataShtimit = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shporta", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Shporta_Klienti_KlientiID",
                        column: x => x.KlientiID,
                        principalTable: "Klienti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shporta_Libri_LibriID",
                        column: x => x.LibriID,
                        principalTable: "Libri",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shporta_MjeteShkollore_MjeteShkolloreID",
                        column: x => x.MjeteShkolloreID,
                        principalTable: "MjeteShkollore",
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

            migrationBuilder.CreateIndex(
                name: "IX_Shporta_KlientiID",
                table: "Shporta",
                column: "KlientiID");

            migrationBuilder.CreateIndex(
                name: "IX_Shporta_LibriID",
                table: "Shporta",
                column: "LibriID");

            migrationBuilder.CreateIndex(
                name: "IX_Shporta_MjeteShkolloreID",
                table: "Shporta",
                column: "MjeteShkolloreID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PorosiItem");

            migrationBuilder.DropTable(
                name: "Shporta");

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
    }
}
