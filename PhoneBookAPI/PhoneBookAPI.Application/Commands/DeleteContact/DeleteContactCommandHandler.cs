using MediatR;
using PhoneBookAPI.Application.DTOs;

namespace PhoneBookAPI.Application.Commands.DeleteContact
{
    public class DeleteContactCommandHandler : IRequestHandler<DeleteContactRequest, bool>
    {
        public Task<bool> Handle(DeleteContactRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
