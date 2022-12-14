using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace PhoneBookAPI.Application.DTOs
{
    public class UpdateContactRequest : IRequest<bool>
    {
        [JsonIgnore]
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? FullName { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public PhoneNumber[]? PhoneNumbers { get; set; }

        public IFormFile? Photo { get; set; }
    }
}
