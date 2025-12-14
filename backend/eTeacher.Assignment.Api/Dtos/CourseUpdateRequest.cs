using System.ComponentModel.DataAnnotations;

namespace eTeacher.Assignment.Api.Dtos;

public record CourseUpdateRequest(
    [Required, MinLength(1)] string Title,
    string? Description
);
