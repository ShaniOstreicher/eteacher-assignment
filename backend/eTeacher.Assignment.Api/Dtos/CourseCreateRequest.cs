using System.ComponentModel.DataAnnotations;

namespace eTeacher.Assignment.Api.Dtos;

public record CourseCreateRequest(
    [Required, MinLength(1)] string Title,
    string? Description
);
