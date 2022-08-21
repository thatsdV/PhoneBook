using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactRepository
    {
        Task<int?> InsertContact(Contact input);

        Task<bool> DeleteContact(int id);

        Task UpdateContact();

        Task GetContactById();

        Task GetContacts();
    }
}
