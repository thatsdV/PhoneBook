using AutoMapper;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Infrastructure.Repositories.DAO;

namespace PhoneBookAPI.Infrastructure.Repositories.Implementations
{
    public class ContactGroupRepository : BaseRepository<ContactGroupDAO>, IContactGroupRepository
    {
        private readonly IMapper _mapper;

        public ContactGroupRepository(IMapper mapper, IConfiguration configuration) : base(mapper, configuration)
        {
            _mapper = mapper;
        }
    }
}
