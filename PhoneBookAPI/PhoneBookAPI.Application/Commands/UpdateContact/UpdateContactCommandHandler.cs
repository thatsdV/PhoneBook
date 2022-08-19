using MediatR;
using PhoneBookAPI.Application.DTOs;

namespace PhoneBookAPI.Application.Commands.UpdateContact
{
    public class UpdateContactCommandHandler : IRequestHandler<UpdateContactRequest, bool>
    {
        public Task<bool> Handle(UpdateContactRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
