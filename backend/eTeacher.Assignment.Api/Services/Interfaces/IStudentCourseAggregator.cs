
using eTeacher.Assignment.Api.Courses;
using eTeacher.Assignment.Api.Dtos;
using eTeacher.Assignment.Api.Students;

public interface IStudentCourseAggregator
{
    IEnumerable<StudentWithCoursesDto> GetStudentsWithCourseDetails();
    IEnumerable<CourseWithStudentsDto> GetCoursesWithStudentDetails();
    IEnumerable<EnrollmentDetailsDto> GetAllEnrollmentDetails();
}