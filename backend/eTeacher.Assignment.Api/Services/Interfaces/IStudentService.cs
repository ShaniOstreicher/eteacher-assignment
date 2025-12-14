using eTeacher.Assignment.Api.Models;

public interface IStudentService
{
    Student? GetById(Guid id);
    IReadOnlyCollection<Student> GetByIds(IEnumerable<Guid> ids);
}
