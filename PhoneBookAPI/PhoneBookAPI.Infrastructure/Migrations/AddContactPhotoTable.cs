using FluentMigrator;

namespace PhoneBookAPI.Infrastructure.Migrations
{
    [Migration(4)]
    public class AddContactPhotoTable : Migration
    {
        public override void Down()
        {
            Delete.Table("ContactPhoto");
        }

        public override void Up()
        {
            Create.Table("ContactPhoto")
                .WithColumn("Id").AsInt64().PrimaryKey().Unique()
                .WithColumn("Name").AsString()
                .WithColumn("CreatedDate").AsDateTime().WithDefaultValue(DateTime.UtcNow)
                .WithColumn("UpdatedDate").AsString().WithDefaultValue(DateTime.UtcNow);
        }
    }
}
