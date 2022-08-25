using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactRepository
    {
        Task<int?> InsertContact(Contact input);

        Task<bool> DeleteContact(int id);

        Task<bool> UpdateContact(int id);

        Task<Contact> GetContactById(int id);

        Task<IEnumerable<Contact>> GetContacts(GetContactsInput input);
    }
}
