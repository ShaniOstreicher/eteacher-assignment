namespace eTeacher.Assignment.Api.Models
{
    public class Student
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string FullName { get; set; } = string.Empty;
    }
}
