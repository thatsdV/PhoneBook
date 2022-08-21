using MediatR;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Contracts;

namespace PhoneBookAPI.Application.Commands.DeleteContact
{
    public class DeleteContactCommandHandler : IRequestHandler<DeleteContactRequest, bool>
    {
        private readonly IContactRepository _repository;

        public DeleteContactCommandHandler(IContactRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteContactRequest request, CancellationToken cancellationToken)
        {
            return await _repository.DeleteContact(request.Id);
        }
    }
}
