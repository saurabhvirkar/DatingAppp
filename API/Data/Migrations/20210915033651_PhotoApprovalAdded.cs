using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class PhotoApprovalAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_AppUserID",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "AppUserID",
                table: "Photos",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_AppUserID",
                table: "Photos",
                newName: "IX_Photos_AppUserId");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Photos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_AppUserId",
                table: "Photos",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_AppUserId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Photos",
                newName: "AppUserID");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_AppUserId",
                table: "Photos",
                newName: "IX_Photos_AppUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_AppUserID",
                table: "Photos",
                column: "AppUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
