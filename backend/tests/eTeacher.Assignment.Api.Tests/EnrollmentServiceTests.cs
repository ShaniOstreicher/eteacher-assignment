using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Models;
using eTeacher.Assignment.Api.Services;
using eTeacher.Assignment.Api.Services.Interfaces;
using Xunit;

namespace eTeacher.Assignment.Api.Tests;

public class EnrollmentServiceTests
{
    [Fact]
    public void Assign_FirstTime_Succeeds_SecondTime_ReturnsAlreadyEnrolled()
    {
        var store = new InMemoryDataStore();

        store.Courses.Clear();
        store.Students.Clear();
        store.Enrolments.Clear();

        var course = new Course { Id = Guid.NewGuid(), Title = "Test Course", Description = "Test" };
        var student = new Student { Id = Guid.NewGuid(), FullName = "Test Student" };

        store.Courses[course.Id] = course;
        store.Students[student.Id] = student;

        var service = new EnrollmentService(store);

        var first = service.Assign(course.Id, student.Id, out var firstResult);

        Assert.Equal(AssignEnrollmentResult.Success, firstResult);
        Assert.NotNull(first);

        var second = service.Assign(course.Id, student.Id, out var secondResult);

        Assert.Equal(AssignEnrollmentResult.AlreadyEnrolled, secondResult);
        Assert.Null(second);
    }
}
