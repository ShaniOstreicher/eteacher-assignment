import React, { useState } from "react";
import { FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import type { CreateEnrollmentRequest } from "../services/enrollments.service";
import "./EnrollmentManagement.css";

interface Option {
  id: string;
  name: string;
}

interface CreateNewEnrollmentProps {
  studentOptions: Option[];
  courseOptions: Option[];
  isSubmitting: boolean;
  isAddingNew: boolean;
  onToggleAdd: () => void;
  onCreate: (formData: CreateEnrollmentRequest) => void;
}

export function CreateNewEnrollment({
  studentOptions,
  courseOptions,
  isSubmitting,
  isAddingNew,
  onToggleAdd,
  onCreate,
}: CreateNewEnrollmentProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const isFormValid = selectedStudentId && selectedCourseId && !isSubmitting;
  const hasOptions = studentOptions.length > 0 && courseOptions.length > 0;

  const handleSave = () => {
    if (!isFormValid || !hasOptions) return;

    onCreate({
      studentId: selectedStudentId,
      courseId: selectedCourseId,
    });

    setSelectedStudentId("");
    setSelectedCourseId("");
  };

  const handleCancel = () => {
    setSelectedStudentId("");
    setSelectedCourseId("");
    onToggleAdd();
  };

  if (!isAddingNew) {
    return (
      <li className="enrollment-management-item new-enrollment-placeholder">
        <div className="enrollment-data-area">
          <h2 style={{ margin: 0 }}>Add New Enrollment</h2>
        </div>
        <div className="action-buttons">
          <button
            onClick={onToggleAdd}
            className="add-button"
            title="Add Enrollment"
            disabled={!hasOptions}
          >
            <FaPlus />
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`enrollment-management-item new-enrollment-form`}>
      <div className="enrollment-data-area form-layout">
        <h2 style={{ margin: "0 0 15px 0" }}>Assign Student to Course</h2>

        <div className="enrollment-item-field select-field">
          <label htmlFor="student-select">Select Student*:</label>
          <select
            id="student-select"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            disabled={isSubmitting || !hasOptions}
            className="inline-select"
          >
            <option value="" disabled>
              -- Select Student --
            </option>
            {studentOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="enrollment-item-field select-field">
          <label htmlFor="course-select">Select Course*:</label>
          <select
            id="course-select"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            disabled={isSubmitting || !hasOptions}
            className="inline-select"
          >
            <option value="" disabled>
              -- Select Course --
            </option>
            {courseOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {!hasOptions && (
          <p className="error-message-inline">
            Cannot enroll: Please ensure both courses and students exist.
          </p>
        )}
      </div>

      <div className="action-buttons">
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className="save-button"
          title="Assign Student"
        >
          <FaCheck />
        </button>
        <button
          onClick={handleCancel}
          disabled={isSubmitting}
          className="cancel-button"
          title="Cancel"
        >
          <FaTimes />
        </button>
      </div>
    </li>
  );
}
