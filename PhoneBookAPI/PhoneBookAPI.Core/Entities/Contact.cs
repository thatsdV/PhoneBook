using Microsoft.AspNetCore.Http;

namespace PhoneBookAPI.Core.Entities
{
    public class Contact
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public IList<ContactNumber> PhoneNumbers { get; set; }

        public ContactPhoto Photo { get; set; }
    }
}
