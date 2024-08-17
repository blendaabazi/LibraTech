using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Mjetet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Klienti_KlientiGjinia_KlientiGjiniaID",
                table: "Klienti");

            migrationBuilder.DropForeignKey(
                name: "FK_Klienti_KlientiQyteti_KlientiQytetiID",
                table: "Klienti");

            migrationBuilder.DropForeignKey(
                name: "FK_Klienti_KlientiRoli_KlientiRoliID",
                table: "Klienti");

            migrationBuilder.DropIndex(
                name: "IX_Klienti_KlientiGjiniaID",
                table: "Klienti");

            migrationBuilder.DropIndex(
                name: "IX_Klienti_KlientiQytetiID",
                table: "Klienti");

            migrationBuilder.DropIndex(
                name: "IX_Klienti_KlientiRoliID",
                table: "Klienti");

            migrationBuilder.DropColumn(
                name: "KlientiGjiniaID",
                table: "Klienti");

            migrationBuilder.DropColumn(
                name: "KlientiQytetiID",
                table: "Klienti");

            migrationBuilder.DropColumn(
                name: "KlientiRoliID",
                table: "Klienti");

            migrationBuilder.AddColumn<string>(
                name: "KlientiGjinia",
                table: "Klienti",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "KlientiQyteti",
                table: "Klienti",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "KlientiRoli",
                table: "Klienti",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KlientiGjinia",
                table: "Klienti");

            migrationBuilder.DropColumn(
                name: "KlientiQyteti",
                table: "Klienti");

            migrationBuilder.DropColumn(
                name: "KlientiRoli",
                table: "Klienti");

            migrationBuilder.AddColumn<int>(
                name: "KlientiGjiniaID",
                table: "Klienti",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KlientiQytetiID",
                table: "Klienti",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KlientiRoliID",
                table: "Klienti",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Klienti_KlientiGjinia_KlientiGjiniaID",
                table: "Klienti",
                column: "KlientiGjiniaID",
                principalTable: "KlientiGjinia",
                principalColumn: "KlientiGjiniaID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Klienti_KlientiQyteti_KlientiQytetiID",
                table: "Klienti",
                column: "KlientiQytetiID",
                principalTable: "KlientiQyteti",
                principalColumn: "KlientiQytetiID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Klienti_KlientiRoli_KlientiRoliID",
                table: "Klienti",
                column: "KlientiRoliID",
                principalTable: "KlientiRoli",
                principalColumn: "KlientiRoliID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
