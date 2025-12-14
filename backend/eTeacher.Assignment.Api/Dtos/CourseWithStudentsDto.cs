using eTeacher.Assignment.Api.Models;

namespace eTeacher.Assignment.Api.Dtos;

public record CourseWithStudentsDto(
    Course Course,
    IReadOnlyCollection<Student> Students
);


