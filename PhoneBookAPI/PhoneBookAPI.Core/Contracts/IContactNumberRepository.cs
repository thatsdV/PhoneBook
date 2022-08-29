using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactNumberRepository
    {
        Task<ContactNumber> GetPreferedContactNumber(int contactId);
    }
}
