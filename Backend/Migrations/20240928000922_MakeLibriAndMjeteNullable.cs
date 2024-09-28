using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MakeLibriAndMjeteNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_Libri_LibriID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_MjeteShkollore_MjeteShkolloreID",
                table: "Produkti");

            migrationBuilder.AlterColumn<int>(
                name: "MjeteShkolloreID",
                table: "Produkti",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "LibriID",
                table: "Produkti",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_Libri_LibriID",
                table: "Produkti",
                column: "LibriID",
                principalTable: "Libri",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_MjeteShkollore_MjeteShkolloreID",
                table: "Produkti",
                column: "MjeteShkolloreID",
                principalTable: "MjeteShkollore",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_Libri_LibriID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_MjeteShkollore_MjeteShkolloreID",
                table: "Produkti");

            migrationBuilder.AlterColumn<int>(
                name: "MjeteShkolloreID",
                table: "Produkti",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LibriID",
                table: "Produkti",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_Libri_LibriID",
                table: "Produkti",
                column: "LibriID",
                principalTable: "Libri",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_MjeteShkollore_MjeteShkolloreID",
                table: "Produkti",
                column: "MjeteShkolloreID",
                principalTable: "MjeteShkollore",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
