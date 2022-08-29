using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Model
{
    public class GetContactByIdOutput
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public IList<ContactNumber> PhoneNumbers { get; set; }

        public ContactPhoto Photo { get; set; }
    }
}
