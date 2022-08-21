using FluentMigrator;

namespace PhoneBookAPI.Infrastructure.Migrations
{
    [Migration(2)]
    public class AddContactNumbersTable : Migration
    {
        public override void Up()
        {
            Create.Table("Numbers")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("Number").AsString()
                .WithColumn("Type").AsString()
                .WithColumn("ContactId").AsInt64().ForeignKey("FK_Number_Contact", "Contact", "Id").NotNullable()
                .WithColumn("CreatedDate").AsDateTime().WithDefaultValue(DateTime.UtcNow)
                .WithColumn("UpdatedDate").AsString().WithDefaultValue(DateTime.UtcNow);
        }

        public override void Down()
        {
            Delete.Table("Numbers");
        }
    }
}
