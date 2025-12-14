using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services.Interfaces;

namespace eTeacher.Assignment.Api.Services;

public class CourseService : ICourseService
{
    private readonly InMemoryDataStore _store;

    public CourseService(InMemoryDataStore store) => _store = store;

    public IReadOnlyCollection<Course> GetAll()
        => _store.Courses.Values.OrderBy(c => c.Title).ToArray();

    public Course? GetById(Guid id)
        => _store.Courses.TryGetValue(id, out var course) ? course : null;

    public Course Create(Course course)
    {
        var created = new Course
        {
            Id = Guid.NewGuid(),
            Title = course.Title,
            Description = course.Description
        };

        _store.Courses[created.Id] = created;
        return created;
    }

    public bool Update(Guid id, Course updated)
    {
        if (!_store.Courses.ContainsKey(id))
            return false;

        var existing = _store.Courses[id];
        existing.Title = updated.Title;
        existing.Description = updated.Description;
        return true;
    }

    public bool Delete(Guid id)
        => _store.Courses.Remove(id);
}
