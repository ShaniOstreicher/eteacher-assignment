using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services.Interfaces;
using eTeacher.Assignment.Api.Students;

namespace eTeacher.Assignment.Api.Services
{
    public class StudentService : IStudentService
    {
        private readonly InMemoryDataStore _store;

        public StudentService(InMemoryDataStore store)
        {
            _store = store;
        }

        public Student? GetById(Guid id)
            => _store.Students.TryGetValue(id, out var s) ? s : null;

        public IReadOnlyCollection<Student> GetByIds(IEnumerable<Guid> ids)
            => ids
                .Select(GetById)
                .Where(s => s != null)
                .Cast<Student>()
                .ToArray();

        public IReadOnlyCollection<Student> GetAll()
        {
            return _store.Students.Values.ToList().AsReadOnly();
        }
    }

}
