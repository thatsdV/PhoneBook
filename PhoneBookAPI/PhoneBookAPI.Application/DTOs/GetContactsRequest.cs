using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsRequest : IRequest<GetContactsResponse>
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }
    }
}
