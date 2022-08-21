using AutoMapper;
using MediatR;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Contracts;

namespace PhoneBookAPI.Application.Commands.GetContactById
{
    public class GetContactByIdCommandHandler : IRequestHandler<GetContactByIdRequest, GetContactByIdResponse>
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _repository;

        public GetContactByIdCommandHandler(IMapper mapper, IContactRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<GetContactByIdResponse> Handle(GetContactByIdRequest request, CancellationToken cancellationToken)
        {
            var contact = await _repository.GetContactById(request.Id);
            return _mapper.Map<GetContactByIdResponse>(contact);
        }
    }
}
