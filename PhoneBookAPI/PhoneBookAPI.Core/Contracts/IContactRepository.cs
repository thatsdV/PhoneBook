using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactRepository
    {
        Task<int?> InsertContact(Contact input);

        Task<bool> DeleteContact();

        Task UpdateContact();

        Task GetContactById();

        Task GetContacts();
    }
}
