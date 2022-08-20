using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsRequest : IRequest<GetContactsResponse>
    {
        public int ItemPerPage { get; set; }
    }
}
