using eTeacher.Assignment.Api.Models;

namespace eTeacher.Assignment.Api.Services.Interfaces;

public interface IEnrollmentService
{
    IReadOnlyCollection<Enrollment> GetAll();
    Enrollment? Assign(Guid courseId, Guid studentId, out AssignEnrollmentResult result);
    IReadOnlyCollection<Guid> GetStudentIdsByCourse(Guid courseId);

}

public enum AssignEnrollmentResult
{
    Success,
    CourseNotFound,
    StudentNotFound,
    AlreadyEnrolled
}
