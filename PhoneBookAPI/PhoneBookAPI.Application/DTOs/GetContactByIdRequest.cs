using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactByIdRequest : IRequest<GetContactByIdResponse>
    {
    }
}
