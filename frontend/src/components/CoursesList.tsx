import { useCoursesWithStudents } from "../queries/courses.queries";
import "./CoursesList.css";

export function CoursesList() {
  const { data, isLoading, isError, error } = useCoursesWithStudents();

  if (isLoading) return <p>Loading courses...</p>;
  if (isError)
    return <p>Error: {error instanceof Error ? error.message : "Failed"}</p>;

  return (
    <div className="courses-container">
      <h2>Courses ({data?.length || 0})</h2>

      {data?.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        data?.map((item) => {
          const { description, title, studentNames } = item;

          return (
            <div key={item.id} className="course-item">
              <div className="course-title">{title}</div>
              {description && (
                <div className="course-description">{description}</div>
              )}

              {studentNames && studentNames.length > 0 ? (
                <div className="students-container">
                  <h3>Students ({studentNames.length})</h3>
                  <ul className="students-list">
                    {studentNames.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="no-students">
                  No students enrolled in this course.
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
