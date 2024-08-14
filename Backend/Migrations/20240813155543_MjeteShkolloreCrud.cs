using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MjeteShkolloreCrud : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProdhuesiMSh",
                columns: table => new
                {
                    ProdhuesiMShID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Prodhuesi = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdhuesiMSh", x => x.ProdhuesiMShID);
                });

            migrationBuilder.CreateTable(
                name: "ShtetiMSh",
                columns: table => new
                {
                    ShtetiMShID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shteti = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShtetiMSh", x => x.ShtetiMShID);
                });

            migrationBuilder.CreateTable(
                name: "Tipi",
                columns: table => new
                {
                    TipiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tipi", x => x.TipiID);
                });

            migrationBuilder.CreateTable(
                name: "MjeteShkollore",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TipiID = table.Column<int>(type: "int", nullable: false),
                    ShtetiMShID = table.Column<int>(type: "int", nullable: false),
                    ProdhuesiMShID = table.Column<int>(type: "int", nullable: false),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cmimi = table.Column<double>(type: "float", nullable: false),
                    Sasia = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MjeteShkollore", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MjeteShkollore_ProdhuesiMSh_ProdhuesiMShID",
                        column: x => x.ProdhuesiMShID,
                        principalTable: "ProdhuesiMSh",
                        principalColumn: "ProdhuesiMShID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MjeteShkollore_ShtetiMSh_ShtetiMShID",
                        column: x => x.ShtetiMShID,
                        principalTable: "ShtetiMSh",
                        principalColumn: "ShtetiMShID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MjeteShkollore_Tipi_TipiID",
                        column: x => x.TipiID,
                        principalTable: "Tipi",
                        principalColumn: "TipiID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MjeteShkollore_ProdhuesiMShID",
                table: "MjeteShkollore",
                column: "ProdhuesiMShID");

            migrationBuilder.CreateIndex(
                name: "IX_MjeteShkollore_ShtetiMShID",
                table: "MjeteShkollore",
                column: "ShtetiMShID");

            migrationBuilder.CreateIndex(
                name: "IX_MjeteShkollore_TipiID",
                table: "MjeteShkollore",
                column: "TipiID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MjeteShkollore");

            migrationBuilder.DropTable(
                name: "ProdhuesiMSh");

            migrationBuilder.DropTable(
                name: "ShtetiMSh");

            migrationBuilder.DropTable(
                name: "Tipi");
        }
    }
}
