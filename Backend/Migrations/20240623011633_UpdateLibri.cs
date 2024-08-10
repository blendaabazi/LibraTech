using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLibri : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shporta");

            migrationBuilder.DropColumn(
                name: "Autori",
                table: "Libri");

            migrationBuilder.AddColumn<int>(
                name: "AutoriID",
                table: "Libri",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Libri_AutoriID",
                table: "Libri",
                column: "AutoriID");

            migrationBuilder.AddForeignKey(
                name: "FK_Libri_Autori_AutoriID",
                table: "Libri",
                column: "AutoriID",
                principalTable: "Autori",
                principalColumn: "AutoriID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libri_Autori_AutoriID",
                table: "Libri");

            migrationBuilder.DropIndex(
                name: "IX_Libri_AutoriID",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "AutoriID",
                table: "Libri");

            migrationBuilder.AddColumn<string>(
                name: "Autori",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Shporta",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KlientiID = table.Column<int>(type: "int", nullable: false),
                    LibriID = table.Column<int>(type: "int", nullable: false),
                    MjeteShkolloreID = table.Column<int>(type: "int", nullable: false),
                    DataShtimit = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false)
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
    }
}
