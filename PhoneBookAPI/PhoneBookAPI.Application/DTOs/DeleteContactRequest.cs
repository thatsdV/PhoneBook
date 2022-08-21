using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PhoneBookAPI.Application.DTOs
{
    public class DeleteContactRequest : IRequest<bool>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }
}
