using MediatR;
using Microsoft.AspNetCore.Http;

namespace PhoneBookAPI.Application.DTOs
{
    public class CreateContactRequest : IRequest<CreateContactResponse>
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? FullName { get; set; } 

        public string? Address { get; set; }

        public string? Email { get; set; }

        public PhoneNumber[]? PhoneNumbers { get; set; }

        public IFormFile? Photo { get; set; }
    }
}
