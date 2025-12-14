namespace eTeacher.Assignment.Api.Models
{
    public class Enrollment
    {
        public Guid CourseId { get; init; }
        public Guid StudentId { get; init; }
        public DateTimeOffset EnrolledAt { get; init; } = DateTimeOffset.UtcNow;
    }
}
