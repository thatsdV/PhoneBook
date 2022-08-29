using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Utils.Files;

namespace PhoneBookAPI.Utils
{
    public class FileManager : IFileManager
    {
        private readonly string _localFilePath;
        private readonly string _serverPath;

        public FileManager(IConfiguration config)
        {
            _localFilePath = config["FileUpload:LocalPath"];
            _serverPath = config["FileUpload:ServerPath"];
        }

        public async Task<string> UploadFile(IFormFile file)
        {
            try
            {
                var fileName = file.FileName;

                var path = Path.Combine(_localFilePath, fileName);

                using (var bits = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(bits);
                }

                return Path.Combine(_serverPath, fileName);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}