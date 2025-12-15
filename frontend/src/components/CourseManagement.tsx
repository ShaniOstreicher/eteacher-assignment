import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
} from "../queries/courses.queries";
import type { Course, UpdateCourseRequest } from "../types/models";
import type { CreateCourseRequest } from "../services/courses.service";

import { CourseListItem } from "./CourseListItem";
import "./CourseManagement.css";

type HandleCancel = () => void;

interface EmptyCoursePlaceholder {
  id: string;
  title: string;
  description: string;
}

export function CourseManagement() {
  const { data: courses, isLoading, isError } = useCourses();
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();

  const emptyCourse: EmptyCoursePlaceholder = {
    id: "new-course-placeholder",
    title: "",
    description: "",
  };

  const handleCreateCourse = (
    formData: CreateCourseRequest,
    handleCancel: HandleCancel
  ) => {
    if (!formData.title.trim()) {
      alert("Title is required for a new course.");
      return;
    }

    createMutation.mutate(formData, {
      onSuccess: (newCourse: Course) => {
        alert(`Course "${newCourse.title}" created successfully!`);
        handleCancel();
      },
      onError: (error: Error) => {
        alert(`Creation failed: ${error.message}`);
      },
    });
  };

  const handleEditSubmit = (
    courseId: string,
    formData: UpdateCourseRequest,
    handleCancel: HandleCancel
  ) => {
    updateMutation.mutate(
      { id: courseId, courseToUpdate: formData as UpdateCourseRequest },
      {
        onSuccess: () => {
          alert(`Course "${formData.title}" updated successfully!`);
          handleCancel();
        },
        onError: (error: Error) => {
          alert(`Update failed: ${error.message}`);
        },
      }
    );
  };

  if (isLoading) return <div className="loading">Loading courses...</div>;
  if (isError) return <div className="error">Error loading courses list.</div>;

  return (
    <div className="course-management-container-inline">
      <ul className="course-management-list">
        <h2>Add new Course</h2>

        {/* New course */}
        <CourseListItem
          course={emptyCourse}
          isNew={true}
          isSubmitting={createMutation.isPending}
          onCreate={handleCreateCourse}
        />

        {courses?.length === 0 ? (
          <li className="no-data-li">No existing courses found.</li>
        ) : (
          <>
            <h2>Courses Management (Add & Edit)</h2>
            {courses?.map((course: Course) => (
              <CourseListItem
                key={course.id}
                course={course}
                isNew={false}
                isSubmitting={updateMutation.isPending}
                onEdit={handleEditSubmit}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
