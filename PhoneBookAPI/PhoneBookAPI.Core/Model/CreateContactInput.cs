using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Model
{
    public class CreateContactInput
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public IList<ContactNumber>? PhoneNumbers { get; set; }

        public string? Photo { get; set; }
    }
}
