using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsRequest : IRequest<IList<GetContactsResponse>>
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }
    }
}
