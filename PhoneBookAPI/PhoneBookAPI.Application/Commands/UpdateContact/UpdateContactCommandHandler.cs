using AutoMapper;
using MediatR;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Application.Commands.UpdateContact
{
    public class UpdateContactCommandHandler : IRequestHandler<UpdateContactRequest, bool>
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _repository;

        public UpdateContactCommandHandler(IMapper mapper, IContactRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateContactRequest request, CancellationToken cancellationToken)
        {
            var contact = _mapper.Map<UpdateContactInput>(request);
            var updated = await _repository.UpdateContact(contact);
            return updated;
        }
    }
}
