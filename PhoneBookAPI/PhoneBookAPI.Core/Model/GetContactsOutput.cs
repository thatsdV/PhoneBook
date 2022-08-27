using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Model
{
    public class GetContactsOutput
    {
        public decimal TotalPages { get; set; }

        public int TotalRecords { get; set; }

        public IList<Contact>? Contacts { get; set; }
    }
}
