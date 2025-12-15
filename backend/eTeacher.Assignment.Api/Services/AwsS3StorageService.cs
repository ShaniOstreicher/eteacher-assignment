using Amazon.S3;
using Amazon.S3.Model;
using eTeacher.Assignment.Api.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace eTeacher.Assignment.Api.Services
{
    public class AwsS3StorageService : ICloudStorageService
    {
        private readonly ILogger<AwsS3StorageService> _logger;
        private const string BucketName = "mocked-course-reports-bucket";

        public AwsS3StorageService(ILogger<AwsS3StorageService> logger)
        {
            _logger = logger;
        }

        public async Task<string> SaveDataAWSAsync(string fileName, string dataContent, string contentType)
        {
            var mockRequest = new PutObjectRequest
            {
                BucketName = BucketName,
                Key = fileName,
                ContentType = contentType
            };

            _logger.LogInformation("--- AWS SDK MOCK: Sending data to S3 ---");
            _logger.LogInformation("AWS Request simulated (Type: {RequestType}): Bucket={Bucket}, Key={Key}",
                nameof(PutObjectRequest), mockRequest.BucketName, mockRequest.Key);

            await Task.Delay(200);

            string mockUrl = $"https://{BucketName}.s3.amazonaws.com/{fileName}";

            _logger.LogInformation("AWS Response simulated (Success): Object stored.Object URL: {Url}", mockUrl);

            return mockUrl;
        }
    }
}