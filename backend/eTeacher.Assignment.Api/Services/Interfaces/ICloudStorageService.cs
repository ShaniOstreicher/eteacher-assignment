using System.Threading.Tasks;

namespace eTeacher.Assignment.Api.Services.Interfaces
{
    public interface ICloudStorageService
    {
        Task<string> SaveDataAWSAsync(string fileName, string dataContent, string contentType);
    }
}