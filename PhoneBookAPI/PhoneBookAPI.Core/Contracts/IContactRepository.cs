using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactRepository
    {
        Task<int?> InsertContact(CreateContactInput input);

        Task<bool> DeleteContact(int id);

        Task<bool> UpdateContact(int id);

        Task<GetContactByIdOutput> GetContactById(int id);

        Task<GetContactsOutput> GetContacts(GetContactsInput input);
    }
}
