import React from "react";
import type { StudentWithCourses } from "../../types/models";
import { useStudentsWithCourses } from "../../queries/students.queries";

import "./StudentsList.css";

export function StudentsList() {
  const { data, isLoading, isError, error } = useStudentsWithCourses();

  if (isLoading) return <p className="loading-message">loading students..</p>;
  if (isError)
    return (
      <p>
        error:
        {error instanceof Error ? error.message : "failed to load students"}
      </p>
    );

  return (
    <div className="students-view">
      <h2> Students list: ({data?.length || 0})</h2>

      {data && data?.length === 0 ? (
        <p className="no-data-message"> No students found.</p>
      ) : (
        <div className="students-container">
          {data?.map((student: StudentWithCourses) => {
            const { id, fullName, courseTitles } = student;

            return (
              <div key={id} className="student-item">
                <div className="student-header">{fullName}</div>

                {courseTitles && courseTitles.length > 0 ? (
                  <div className="courses-list-wrapper">
                    <div className="courses-header">
                      Courses ({courseTitles.length})
                    </div>
                    <ul className="courses-list">
                      {courseTitles.map((courseTitle) => (
                        <li key={courseTitle} className="course-name-item">
                          {courseTitle}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="no-courses">Student dosent have enrollments</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
