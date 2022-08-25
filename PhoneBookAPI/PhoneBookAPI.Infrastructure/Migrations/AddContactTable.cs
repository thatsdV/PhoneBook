using FluentMigrator;

namespace PhoneBookAPI.Infrastructure.Migrations
{
    [Migration(1)]
    public class AddContactTable : Migration
    {      
        public override void Up()
        {
            Create.Table("Contact")
                .WithColumn("Id").AsInt64().PrimaryKey().Unique()
                .WithColumn("FirstName").AsString().NotNullable()
                .WithColumn("LastName").AsString().NotNullable()
                .WithColumn("FullName").AsString().NotNullable()
                .WithColumn("Email").AsString()
                .WithColumn("Address").AsString()
                .WithColumn("CreatedDate").AsDateTime().WithDefaultValue(DateTime.UtcNow)
                .WithColumn("UpdatedDate").AsString().WithDefaultValue(DateTime.UtcNow);
        }

        public override void Down()
        {
            Delete.Table("Contact");
        }
    }
}
