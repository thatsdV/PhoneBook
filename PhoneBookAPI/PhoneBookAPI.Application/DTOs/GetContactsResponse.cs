namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsResponse
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }
    }
}
