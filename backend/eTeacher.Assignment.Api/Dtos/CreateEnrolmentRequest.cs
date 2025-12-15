using System.ComponentModel.DataAnnotations;

namespace eTeacher.Assignment.Api.Dtos;

public record CreateEnrollmentRequest(
    [Required] Guid CourseId,
    [Required] Guid StudentId
);
