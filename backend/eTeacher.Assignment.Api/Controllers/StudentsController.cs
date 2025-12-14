using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace eTeacher.Assignment.Api.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public StudentsController(InMemoryDataStore store) => _store = store;

    [HttpGet]
    public ActionResult<IEnumerable<Student>> GetAll()
        => Ok(_store.Students.Values.OrderBy(s => s.FullName));
}
