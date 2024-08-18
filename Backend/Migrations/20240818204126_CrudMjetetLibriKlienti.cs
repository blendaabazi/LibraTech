using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class CrudMjetetLibriKlienti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KlientiRoliID",
                table: "KlientiRoli",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KlientiQytetiID",
                table: "KlientiQyteti",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KlientiGjiniaID",
                table: "KlientiGjinia",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "KlientiRoli",
                newName: "KlientiRoliID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "KlientiQyteti",
                newName: "KlientiQytetiID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "KlientiGjinia",
                newName: "KlientiGjiniaID");
        }
    }
}
