using MediatR;
using PhoneBookAPI.Application.DTOs;

namespace PhoneBookAPI.Application.Commands.CreateContact
{
    public class CreateContactCommandHandler : IRequestHandler<CreateContactRequest, CreateContactResponse>
    {


        public async Task<CreateContactResponse> Handle(CreateContactRequest request, CancellationToken cancellationToken)
        {
            await Task.Delay(1);
            return new CreateContactResponse { Id = 1 };
        }
    }
}
