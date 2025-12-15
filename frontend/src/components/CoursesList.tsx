import { useCoursesWithStudents } from "../queries/courses.queries";
import "./CoursesList.css";

export function CoursesList() {
  const { data, isLoading, isError, error } = useCoursesWithStudents();

  if (isLoading) return <p>Loading courses...</p>;
  if (isError)
    return <p>Error: {error instanceof Error ? error.message : "Failed"}</p>;

  return (
    <div className="courses">
      <h2>Courses ({data?.length || 0})</h2>

      {data?.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        data?.map((item) => {
          const { description, title, studentNames } = item;

          return (
            <div key={item.id} className="courseItem">
              <div className="courseTitle">{title}</div>
              {description && (
                <div className="courseDescription">{description}</div>
              )}

              {studentNames && studentNames.length > 0 ? (
                <div className="studentsContainer">
                  <h3>Students ({studentNames.length})</h3>
                  <ul className="studentsList">
                    {studentNames.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="noStudents">
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
