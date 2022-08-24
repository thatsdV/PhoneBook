using FluentMigrator;

namespace PhoneBookAPI.Infrastructure.Migrations
{
    [Migration(3)]
    public class AddContactGroupTable : Migration
    {
        public override void Down()
        {
            Delete.Table("ContactGroup");
        }

        public override void Up()
        {
            Create.Table("ContactGroup")
                .WithColumn("Id").AsInt64().PrimaryKey().Unique()
                .WithColumn("Name").AsString()
                .WithColumn("CreatedDate").AsDateTime().WithDefaultValue(DateTime.UtcNow)
                .WithColumn("UpdatedDate").AsString().WithDefaultValue(DateTime.UtcNow);

            Alter.Table("Contact")
                .AddColumn("GroupId")
                .AsInt64()
                .ForeignKey("ContactGroup", "Id")
                .Nullable();
        }
    }
}
