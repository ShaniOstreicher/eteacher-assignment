using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Students;

public interface IStudentService
{
    IReadOnlyCollection<Student> GetAll();
    Student? GetById(Guid id);
    IReadOnlyCollection<Student> GetByIds(IEnumerable<Guid> ids);
}
