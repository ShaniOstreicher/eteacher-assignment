using System.ComponentModel.DataAnnotations;

namespace eTeacher.Assignment.Api.Dtos;

public record CreateEnrolmentRequest(
    [Required] Guid CourseId,
    [Required] Guid StudentId
);
