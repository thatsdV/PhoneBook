using MediatR;
using PhoneBookAPI.Application.DTOs;

namespace PhoneBookAPI.Application.Commands.GetContacts
{
    public class GetContactsCommandHandler : IRequestHandler<GetContactsRequest, GetContactsResponse>
    {
        public Task<GetContactsResponse> Handle(GetContactsRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
