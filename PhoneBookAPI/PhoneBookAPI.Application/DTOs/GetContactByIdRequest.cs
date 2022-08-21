using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactByIdRequest : IRequest<GetContactByIdResponse>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }
}
