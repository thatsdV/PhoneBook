using AutoMapper;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Infrastructure.Repositories.DAO;
using System.Transactions;

namespace PhoneBookAPI.Infrastructure.Repositories.Implementations
{
    public class ContactNumberRepository : BaseRepository<ContactNumberDAO>, IContactNumberRepository
    {
        private readonly IMapper _mapper;

        public ContactNumberRepository(IMapper mapper, IConfiguration configuration) : base(mapper, configuration)
        {
            _mapper = mapper;
        }

        public async Task<bool> InsertContactNumber(ContactNumber contactNumber)
        {
            using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var contact = _mapper.Map<ContactNumberDAO>(contactNumber);

                var inserted = (int?)await InsertAsync<ContactNumberDAO>(contact);

                transaction.Complete();

                return inserted.HasValue;
            }
            catch (Exception ex)
            {
                transaction.Dispose();
                throw ex;
            }
        }
    }
}
