using eTeacher.Assignment.Api.Models;

namespace eTeacher.Assignment.Api.Services.Interfaces;

public interface IEnrollmentService
{
    IReadOnlyCollection<Enrollment> GetAll();

    /// <summary>
    /// Assign a student to a course.
    /// Returns: Created enrollment if success, or null if not found/conflict.
    /// </summary>
    Enrollment? Assign(Guid courseId, Guid studentId, out AssignEnrollmentResult result);
}

public enum AssignEnrollmentResult
{
    Success,
    CourseNotFound,
    StudentNotFound,
    AlreadyEnrolled
}
