using eTeacher.Assignment.Api.Dtos;
using eTeacher.Assignment.Api.Models;

namespace eTeacher.Assignment.Api.Services.Interfaces;

public interface ICourseService
{
    IReadOnlyCollection<Course> GetAll();
    Course? GetById(Guid id);
    Course Create(Course course);
    bool Update(Guid id, Course updated);
    bool Delete(Guid id);
}
