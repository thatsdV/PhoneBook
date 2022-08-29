using Microsoft.AspNetCore.Http;

namespace PhoneBookAPI.Utils.Files
{
    public interface IFileManager
    {
        Task<string> UploadFile(IFormFile file);
    }
}
