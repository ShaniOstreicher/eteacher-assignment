using eTeacher.Assignment.Api.Models;

namespace eTeacher.Assignment.Api.Data;

public class InMemoryDataStore
{
    public Dictionary<Guid, Course> Courses { get; } = new();
    public Dictionary<Guid, Student> Students { get; } = new();
    public List<Enrollment> Enrolments { get; } = new();

    public InMemoryDataStore()
    {
        Seed();
    }

    private void Seed()
    {
        // Students
        var s1 = new Student { FullName = "Dana Levi" };
        var s2 = new Student { FullName = "Noam Cohen" };
        var s3 = new Student { FullName = "Yael Friedman" };

        Students[s1.Id] = s1;
        Students[s2.Id] = s2;
        Students[s3.Id] = s3;

        // One course
        var course = new Course
        {
            Title = "Intro to Full-Stack Development",
            Description = "A short demo course seeded for the assignment."
        };

        Courses[course.Id] = course;

        // Enrolments (assign a student to a course)
        Enrolments.Add(new Enrollment { CourseId = course.Id, StudentId = s1.Id });
        Enrolments.Add(new Enrollment { CourseId = course.Id, StudentId = s2.Id });
    }
}
