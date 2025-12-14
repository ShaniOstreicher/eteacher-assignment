using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services.Interfaces;

namespace eTeacher.Assignment.Api.Services;

public class EnrollmentService : IEnrollmentService
{
    private readonly InMemoryDataStore _store;

    public EnrollmentService(InMemoryDataStore store) => _store = store;

    public IReadOnlyCollection<Enrollment> GetAll()
        => _store.Enrolments.ToArray();

    public IReadOnlyCollection<Guid> GetStudentIdsByCourse(Guid courseId)
    => _store.Enrolments
        .Where(e => e.CourseId == courseId)
        .Select(e => e.StudentId)
        .Distinct()
        .ToArray();

    public Enrollment? Assign(Guid courseId, Guid studentId, out AssignEnrollmentResult result)
    {
        if (!_store.Courses.ContainsKey(courseId))
        {
            result = AssignEnrollmentResult.CourseNotFound;
            return null;
        }

        if (!_store.Students.ContainsKey(studentId))
        {
            result = AssignEnrollmentResult.StudentNotFound;
            return null;
        }

        var alreadyEnrolled = _store.Enrolments.Any(e =>
            e.CourseId == courseId && e.StudentId == studentId);

        if (alreadyEnrolled)
        {
            result = AssignEnrollmentResult.AlreadyEnrolled;
            return null;
        }

        var enrolment = new Enrollment
        {
            CourseId = courseId,
            StudentId = studentId
        };

        _store.Enrolments.Add(enrolment);

        result = AssignEnrollmentResult.Success;
        return enrolment;
    }
}
