using AutoMapper;
using MediatR;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Contracts;

namespace PhoneBookAPI.Application.Commands.GetContacts
{
    public class GetContactsCommandHandler : IRequestHandler<GetContactsRequest, GetContactsResponse>
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _repository;

        public GetContactsCommandHandler(IMapper mapper, IContactRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<GetContactsResponse> Handle(GetContactsRequest request, CancellationToken cancellationToken)
        {
            //var contactsList = 
                await _repository.GetContacts();

            throw new NotImplementedException();
        }
    }
}
