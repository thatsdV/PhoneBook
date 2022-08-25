namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactByIdResponse
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public IList<PhoneNumber> PhoneNumbers { get; set; }
    }
}
