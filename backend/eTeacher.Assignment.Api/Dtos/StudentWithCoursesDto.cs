namespace eTeacher.Assignment.Api.Students
{
    public class StudentWithCoursesDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public IEnumerable<string> CourseTitles { get; set; } = Enumerable.Empty<string>();
    }
}