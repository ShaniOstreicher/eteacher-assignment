
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services;
using eTeacher.Assignment.Api.Students;
using Microsoft.AspNetCore.Mvc;

namespace eTeacher.Assignment.Api.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IStudentCourseAggregator _aggregator;
    public StudentsController(IStudentService studentService, IStudentCourseAggregator aggregator)
    {
        _studentService = studentService;
        _aggregator = aggregator;
    }

    [HttpGet]
    public ActionResult GetAll([FromQuery] string? include)
    {
        if (include?.ToLower() == "students")
        {
            var studentsWithCourses = _aggregator.GetStudentsWithCourseDetails();
            return Ok(studentsWithCourses);
        }

        var students = _studentService.GetAll();
        return Ok(students);
    }
}