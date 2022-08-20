using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactByIdRequest : IRequest<GetContactByIdResponse>
    {
        public int Id { get; set; }
    }
}
