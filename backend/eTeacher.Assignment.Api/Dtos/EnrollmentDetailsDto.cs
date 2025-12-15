namespace eTeacher.Assignment.Api.Dtos
{
    public class EnrollmentDetailsDto
    {
        public Guid CourseId { get; set; }
        public string CourseTitle { get; set; } = string.Empty;

        public Guid StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
    }
}