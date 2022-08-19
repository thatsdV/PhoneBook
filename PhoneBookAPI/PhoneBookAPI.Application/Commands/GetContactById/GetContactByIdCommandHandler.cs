using MediatR;
using PhoneBookAPI.Application.DTOs;

namespace PhoneBookAPI.Application.Commands.GetContactById
{
    public class GetContactByIdCommandHandler : IRequestHandler<GetContactByIdRequest, GetContactByIdResponse>
    {
        public Task<GetContactByIdResponse> Handle(GetContactByIdRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
