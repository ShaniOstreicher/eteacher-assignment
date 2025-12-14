using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace eTeacher.Assignment.Api.Controllers;

[ApiController]
[Route("api/enrolments")]
public class EnrolmentsController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public EnrolmentsController(InMemoryDataStore store) => _store = store;

    [HttpGet]
    public ActionResult<IEnumerable<Enrollment>> GetAll()
        => Ok(_store.Enrolments);

    public record CreateEnrolmentRequest(Guid CourseId, Guid StudentId);

    [HttpPost]
    public ActionResult<Enrollment> Create([FromBody] CreateEnrolmentRequest request)
    {
        if (!_store.Courses.ContainsKey(request.CourseId))
            return NotFound($"Course '{request.CourseId}' was not found.");

        if (!_store.Students.ContainsKey(request.StudentId))
            return NotFound($"Student '{request.StudentId}' was not found.");

        var alreadyEnrolled = _store.Enrolments.Any(e =>
            e.CourseId == request.CourseId && e.StudentId == request.StudentId);

        if (alreadyEnrolled)
            return Conflict("Student is already enrolled in this course.");

        var enrolment = new Enrollment
        {
            CourseId = request.CourseId,
            StudentId = request.StudentId
        };

        _store.Enrolments.Add(enrolment);
        return CreatedAtAction(nameof(GetAll), enrolment);
    }
}
