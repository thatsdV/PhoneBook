using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class GetContactsRequest : IRequest<GetContactsResponse>
    {
        public int PageNumber { get; set; }

        public int ItemsPerPage { get; set; }

        public string? SearchCriteria { get; set; }

        public string? OrderBy { get; set; }
    }
}
