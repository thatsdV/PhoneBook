using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsRequest : IRequest<GetContactsResponse>
    {
    }
}
