import React, { useState, useEffect } from "react";
import { FaEdit, FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import "../CourseManagement/CourseManagement.css";

import type { Course } from "../../types/models";
import type {
  CreateCourseRequest,
  UpdateCourseRequest,
} from "../../services/courses.service";

interface CourseListItemProps {
  course: Course | (CreateCourseRequest & { id: string });
  isNew?: boolean;
  isSubmitting?: boolean;
  onCreate?: (formData: CreateCourseRequest, handleCancel: () => void) => void;
  onEdit?: (
    courseId: string,
    formData: UpdateCourseRequest,
    handleCancel: () => void
  ) => void;
}

export function CourseListItem({
  course,
  isNew = false,
  isSubmitting: parentIsSubmitting = false,
  onCreate,
  onEdit,
}: CourseListItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(isNew);
  const [title, setTitle] = useState<string>(course.title);
  const [description, setDescription] = useState<string>(
    course.description || ""
  );

  const isSubmitting: boolean = parentIsSubmitting;

  useEffect(() => {
    setTitle(course.title);
    setDescription(course.description || "");
  }, [course]);

  const handleCancel = (): void => {
    setTitle(course.title);
    setDescription(course.description || "");
    setIsEditing(isNew);
  };

  const handleSave = (courseId: string): void => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const formData: CreateCourseRequest = {
      title: title.trim(),
      description: description.trim(),
    };

    if (isNew && onCreate) {
      onCreate(formData, handleCancel);
    } else if (onEdit) {
      onEdit(courseId, formData, handleCancel);
      setIsEditing(false);
    }
  };

  const itemClassName: string = isNew
    ? "new-course-item"
    : isEditing
    ? "editing"
    : "";

  return (
    <li className={`course-management-item ${itemClassName}`}>
      <div className="course-data">
        <div className="course-item-field">
          {isEditing || isNew ? (
            <label>
              {isNew ? "New Course Title*" : "Title:"}
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                className="inline-input"
                placeholder={isNew ? "Enter course title here..." : ""}
              />
            </label>
          ) : (
            <div className="course-title-item">{course.title}</div>
          )}
        </div>

        <div className="course-item-field description-field">
          {isEditing || isNew ? (
            <label>
              Description:
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                className="inline-textarea"
                placeholder={isNew ? "Optional description..." : ""}
              />
            </label>
          ) : (
            <span className="course-description-text">
              {course.description || "No description provided."}
            </span>
          )}
        </div>
      </div>

      <div className="action-buttons">
        {isEditing || isNew ? (
          <>
            <button
              onClick={() => handleSave(course?.id)}
              disabled={isSubmitting || !title.trim()}
              className="save-button"
              title={isNew ? "Create Course" : "Save Changes"}
            >
              {isNew ? <FaPlus /> : <FaCheck />}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="cancel-button"
              title="Cancel"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            disabled={isSubmitting}
            className="edit-button"
            title="Edit"
          >
            <FaEdit />
          </button>
        )}
      </div>
    </li>
  );
}
