namespace eTeacher.Assignment.Api.Models
{
    public class Course
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
