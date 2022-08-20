using FluentMigrator;

namespace PhoneBookAPI.Infrastructure.Migrations
{
    [Migration(1)]
    public class AddContactTable : Migration
    {      
        public override void Up()
        {
            Create.Table("Contact")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity();
        }

        public override void Down()
        {
            Delete.Table("Contact");
        }
    }
}
