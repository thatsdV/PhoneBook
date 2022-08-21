using AutoMapper;
using MediatR;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Contracts;

namespace PhoneBookAPI.Application.Commands.GetContacts
{
    public class GetContactsCommandHandler : IRequestHandler<GetContactsRequest, IList<GetContactsResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _repository;

        public GetContactsCommandHandler(IMapper mapper, IContactRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<GetContactsResponse>> Handle(GetContactsRequest request, CancellationToken cancellationToken)
        {
            var contactsList = await _repository.GetContacts(request.PageNumber, request.PageSize);
            return _mapper.Map<List<GetContactsResponse>>(contactsList);
        }
    }
}
