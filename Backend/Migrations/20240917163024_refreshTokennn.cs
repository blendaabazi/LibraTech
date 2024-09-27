using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class refreshTokennn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "RefreshTokenModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokenModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produkti");

            migrationBuilder.DropTable(
                name: "RefreshTokenModel");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Porosia");
        }
    }
}
