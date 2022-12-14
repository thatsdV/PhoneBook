using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsResponse
    {
        public int TotalPages { get; set; }

        public int TotalRecords { get; set; }

        public IList<Contact>? Contacts { get; set; }
    }
}
