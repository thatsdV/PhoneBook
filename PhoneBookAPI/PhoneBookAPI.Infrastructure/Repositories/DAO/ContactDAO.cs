using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneBookAPI.Infrastructure.Repositories.DAO
{
    [Table("Contact")]
    public class ContactDAO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string FullName { get; set; }

        [NotMapped]
        public IList<ContactNumberDAO> PhoneNumbers { get; set; }

        [NotMapped]
        public ContactPhotoDAO Photo { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}
