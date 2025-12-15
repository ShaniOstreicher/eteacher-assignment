using eTeacher.Assignment.Api.Courses;
using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Dtos;
using eTeacher.Assignment.Api.Services.Interfaces;
using eTeacher.Assignment.Api.Students;
using System.Collections.Generic;
using System.Linq;

namespace eTeacher.Assignment.Api.Services
{
    public class StudentCourseAggregator : IStudentCourseAggregator
    {
        private readonly IStudentService _studentService;
        private readonly ICourseService _courseService;
        private readonly IEnrollmentService _enrollmentService;

        public StudentCourseAggregator(
            IStudentService studentService,
            ICourseService courseService,
            IEnrollmentService enrollmentService)
        {
            _studentService = studentService;
            _courseService = courseService;
            _enrollmentService = enrollmentService;
        }

        public IEnumerable<StudentWithCoursesDto> GetStudentsWithCourseDetails()
        {
            var allStudents = _studentService.GetAll();
            var allEnrollments = _enrollmentService.GetAll();

            var allCoursesTitles = _courseService.GetAll()
                                                 .ToDictionary(c => c.Id, c => c.Title);

            return allStudents
                .OrderBy(s => s.FullName)
                .Select(student =>
                {
                    var courseTitles = allEnrollments
                        .Where(e => e.StudentId == student.Id)
                        .Select(e => allCoursesTitles.GetValueOrDefault(e.CourseId))
                        .Where(title => title != null)
                        .Cast<string>()
                        .ToList();

                    return new StudentWithCoursesDto
                    {
                        Id = student.Id,
                        FullName = student.FullName,
                        CourseTitles = courseTitles
                    };
                })
                .ToList();
        }

        public IEnumerable<CourseWithStudentsDto> GetCoursesWithStudentDetails()
        {
            var allCourses = _courseService.GetAll();
            var allEnrollments = _enrollmentService.GetAll();

            var allStudentNames = _studentService.GetAll()
                                                .ToDictionary(s => s.Id, s => s.FullName);

            return allCourses
                .OrderBy(c => c.Title)
                .Select(course =>
                {
                    var studentNames = allEnrollments
                        .Where(e => e.CourseId == course.Id)
                        .Select(e => allStudentNames.GetValueOrDefault(e.StudentId))
                        .Where(name => name != null)
                        .Cast<string>()
                        .ToList();

                    return new CourseWithStudentsDto
                    {
                        Id = course.Id,
                        Description = course.Description,
                        Title = course.Title,
                        StudentNames = studentNames
                    };
                })
                .ToList();
        }

        public IEnumerable<EnrollmentDetailsDto> GetAllEnrollmentDetails()
        {
            var allEnrollments = _enrollmentService.GetAll();
            var allCoursesMap = _courseService.GetAll().ToDictionary(c => c.Id, c => c.Title);
            var allStudentsMap = _studentService.GetAll().ToDictionary(s => s.Id, s => s.FullName);

            return allEnrollments
        .Select(e =>
        {
            var courseTitle = allCoursesMap.GetValueOrDefault(e.CourseId) ?? "Unknown Course";
            var studentName = allStudentsMap.GetValueOrDefault(e.StudentId) ?? "Unknown Student";

            return new EnrollmentDetailsDto
            {
                CourseId = e.CourseId,
                CourseTitle = courseTitle,
                StudentId = e.StudentId,
                StudentName = studentName
            };
        })
                .OrderBy(d => d.CourseTitle)
                .ToList();
        }
    }
}