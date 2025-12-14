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
        var s1 = new Student { FullName = "דנה לוי" };
        var s2 = new Student { FullName = "נועם כהן" };
        var s3 = new Student { FullName = "יעל פרידמן" };
        var s4 = new Student { FullName = "איתי גורן" };
        var s5 = new Student { FullName = "מאיה שבתאי" };
        var s6 = new Student { FullName = "יוסי לוין" };
        var s7 = new Student { FullName = "שירה בן-דוד" };
        var s8 = new Student { FullName = "עומר חסון" };
        var s9 = new Student { FullName = "רננה גולן" };
        var s10 = new Student { FullName = "מיכאל אטיאס" };
        var s11 = new Student { FullName = "רותם וקסלר" };
        var s12 = new Student { FullName = "גפן קפלן" };
        var s13 = new Student { FullName = "אריק אלוני" };

        Student[] allStudents = { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13 };

        foreach (var student in allStudents)
        {
            Students[student.Id] = student;
        }

        // courses

        var coursePython = new Course
        {
            Title = "מבוא לפיתוח Python",
            Description = "קורס דמו קצר למפתחי פייתון"
        };

        var courseReact = new Course
        {
            Title = "פיתוח אפליקציות עם React ו-Redux",
            Description = "קורס מתקדם לפיתוח Frontend"
        };

        var courseDatabase = new Course
        {
            Title = "בסיסי נתונים SQL מתקדמים",
            Description = "עקרונות SQL ומידול נתונים"
        };

        Courses[coursePython.Id] = coursePython;
        Courses[courseReact.Id] = courseReact;
        Courses[courseDatabase.Id] = courseDatabase;

        // Enrollments

        Enrolments.Add(new Enrollment { CourseId = coursePython.Id, StudentId = s1.Id });
        Enrolments.Add(new Enrollment { CourseId = coursePython.Id, StudentId = s2.Id });
        Enrolments.Add(new Enrollment { CourseId = coursePython.Id, StudentId = s3.Id });
        Enrolments.Add(new Enrollment { CourseId = coursePython.Id, StudentId = s10.Id });
        Enrolments.Add(new Enrollment { CourseId = coursePython.Id, StudentId = s11.Id });

        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s4.Id }); 
        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s5.Id });
        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s6.Id });
        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s7.Id });
        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s8.Id });
        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s9.Id });
        Enrolments.Add(new Enrollment { CourseId = courseReact.Id, StudentId = s12.Id });

    }
}