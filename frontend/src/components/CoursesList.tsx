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
          const { course, students } = item;

          return (
            <div key={course.id} className="courseItem">
              <div className="courseTitle">{course.title}</div>
              {course.description && (
                <div className="courseDescription">{course.description}</div>
              )}

              {students && students.length > 0 ? (
                <div className="studentsContainer">
                  <h3>Students ({students.length})</h3>
                  <ul className="studentsList">
                    {students.map((student) => (
                      <li key={student.id}>{student.fullName}</li>
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
