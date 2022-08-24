using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Core.Contracts
{
    public interface IContactService
    {
        Task<int?> CreateContact(CreateContactInput input);
    }
}
