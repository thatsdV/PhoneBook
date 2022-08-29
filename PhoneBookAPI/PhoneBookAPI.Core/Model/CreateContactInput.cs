using Microsoft.AspNetCore.Http;
using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Model
{
    public class CreateContactInput
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? FullName { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public ContactNumber[]? PhoneNumbers { get; set; }

        public IFormFile? Photo { get; set; }
    }
}
