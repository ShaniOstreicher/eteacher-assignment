using eTeacher.Assignment.Api.Dtos;
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace eTeacher.Assignment.Api.Controllers;

[ApiController]
[Route("api/enrolments")]
public class EnrolmentsController : ControllerBase
{
    private readonly IEnrollmentService _enrollments;
    private readonly IStudentCourseAggregator _aggregator;

    public EnrolmentsController(IEnrollmentService enrollments, IStudentCourseAggregator aggregator)
    {
        _enrollments = enrollments;
        _aggregator = aggregator;
    }

    [HttpGet]
    public ActionResult<IEnumerable<EnrollmentDetailsDto>> GetAll()
        => Ok(_aggregator.GetAllEnrollmentDetails());

    [HttpPost]
    public ActionResult<Enrollment> Create([FromBody] CreateEnrolmentRequest request)
    {
        var enrolment = _enrollments.Assign(request.CourseId, request.StudentId, out var result);

        return result switch
        {
            AssignEnrollmentResult.Success => CreatedAtAction(nameof(GetAll), enrolment),
            AssignEnrollmentResult.CourseNotFound => NotFound($"Course '{request.CourseId}' was not found."),
            AssignEnrollmentResult.StudentNotFound => NotFound($"Student '{request.StudentId}' was not found."),
            AssignEnrollmentResult.AlreadyEnrolled => Conflict("Student is already enrolled in this course."),
            _ => StatusCode(500)
        };
    }
}