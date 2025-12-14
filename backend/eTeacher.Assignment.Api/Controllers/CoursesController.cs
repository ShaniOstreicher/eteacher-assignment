using eTeacher.Assignment.Api.Dtos;
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace eTeacher.Assignment.Api.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly ICourseService _courses;

    public CoursesController(ICourseService courses) => _courses = courses;

    [HttpGet]
    public ActionResult<IEnumerable<Course>> GetAll()
        => Ok(_courses.GetAll());

    [HttpGet("{id:guid}")]
    public ActionResult<Course> GetById(Guid id)
    {
        var course = _courses.GetById(id);
        return course is null ? NotFound() : Ok(course);
    }

    [HttpPost]
    public ActionResult<Course> Create([FromBody] CourseCreateRequest request)
    {

        var created = _courses.Create(new Course
        {
            Title = request.Title.Trim(),
            Description = request.Description
        });

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, [FromBody] CourseUpdateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest("Title is required.");

        var ok = _courses.Update(id, new Course
        {
            Title = request.Title.Trim(),
            Description = request.Description
        });

        return ok ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        var ok = _courses.Delete(id);
        return ok ? NoContent() : NotFound();
    }
}
