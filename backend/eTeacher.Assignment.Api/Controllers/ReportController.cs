
using eTeacher.Assignment.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;

namespace CourseManagement.Controllers
{
    [ApiController]
    [Route("api/reports")]
    public class ReportController : ControllerBase
    {
        private readonly ICloudStorageService _storageService;

        public ReportController(ICloudStorageService storageService)
        {
            _storageService = storageService; 
        }

        [HttpPost("AWS")]
        public async Task<IActionResult> ExportEnrollmentReportToS3()
        {
            var mockData = new
            {
                ReportName = "Enrollment Summary",
                GeneratedAt = DateTime.UtcNow,
                Status = "Data mock for S3 export validation",
                TotalRecords = 5,
            };

            string jsonContent = System.Text.Json.JsonSerializer.Serialize(mockData, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });

            string fileName = $"enrollment-report-{DateTime.UtcNow:yyyyMMdd_HHmmss}.json";
            string fileUrl = await _storageService.SaveDataAWSAsync(
                fileName,
                jsonContent,
                "application/json"
            );

            return Ok(new { Message = "Enrollment report successfully exported (mocked via AWS SDK).", FileUrl = fileUrl });
        }
    }
}