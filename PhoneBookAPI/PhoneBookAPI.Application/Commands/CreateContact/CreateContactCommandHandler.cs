using AutoMapper;
using MediatR;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Application.Commands.CreateContact
{
    public class CreateContactCommandHandler : IRequestHandler<CreateContactRequest, CreateContactResponse>
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _repository;

        public CreateContactCommandHandler(IMapper mapper, IContactRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<CreateContactResponse> Handle(CreateContactRequest request, CancellationToken cancellationToken)
        {
            var contact = _mapper.Map<Contact>(request);
            var insertedContact = await _repository.InsertContact(contact);
            return _mapper.Map<CreateContactResponse>(insertedContact);
        }
    }
}
