using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactNumberRepository
    {
        Task<bool> InsertContactNumber(ContactNumber contactNumber);

        Task<ContactNumber> GetPreferedContactNumber(int contactId);
    }
}
