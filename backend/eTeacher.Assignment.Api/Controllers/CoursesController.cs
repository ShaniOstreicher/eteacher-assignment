using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace eTeacher.Assignment.Api.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public CoursesController(InMemoryDataStore store) => _store = store;

    [HttpGet]
    public ActionResult<IEnumerable<Course>> GetAll()
        => Ok(_store.Courses.Values.OrderBy(c => c.Title));
}
