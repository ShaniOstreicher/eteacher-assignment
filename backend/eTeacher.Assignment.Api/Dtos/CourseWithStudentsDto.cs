namespace eTeacher.Assignment.Api.Courses
{
    public class CourseWithStudentsDto
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
        public List<string> StudentNames { get; set; } = new List<string>();
    }
}