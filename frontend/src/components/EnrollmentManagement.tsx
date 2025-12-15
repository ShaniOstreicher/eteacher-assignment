import React, { useState } from "react";
import { useStudents } from "../queries/students.queries";
import { useCourses } from "../queries/courses.queries";
import {
  useEnrollments,
  useCreateEnrollment,
} from "../queries/enrollments.queries";
import type { CreateEnrollmentRequest } from "../services/enrollments.service";
import { CreateNewEnrollment } from "./CreateNewEnrollment";
import { EnrollmentListItem } from "./EnrollmentListItem";
import "./EnrollmentManagement.css";
import type { Enrollment } from "../types/models";

export function EnrollmentManagement() {
  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    isError: isErrorEnrollments,
    error: enrollmentsError,
  } = useEnrollments();
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: courses, isLoading: isLoadingCourses } = useCourses();

  const createMutation = useCreateEnrollment();

  const studentOptions =
    students?.map((s) => ({ id: s.id, name: s.fullName })) || [];
  const courseOptions =
    courses?.map((c) => ({ id: c.id, name: c.title })) || [];

  const [isAddingNew, setIsAddingNew] = useState(false);

  if (isLoadingEnrollments || isLoadingStudents || isLoadingCourses) {
    return <div className="loading">Loading enrollments data...</div>;
  }

  if (isErrorEnrollments) {
    return (
      <div className="error">
        Error loading enrollments list:{" "}
        {enrollmentsError instanceof Error
          ? enrollmentsError.message
          : "Failed"}
      </div>
    );
  }

  const handleCreateEnrollment = (formData: CreateEnrollmentRequest) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        alert(`Enrollment created successfully!`);
        setIsAddingNew(false);
      },
      onError: (error: Error) => {
        alert(`Enrollment failed: ${error.message}`);
      },
    });
  };

  return (
    <div className="enrollment-management-container">
      <ul className="enrollment-management-list">
        <CreateNewEnrollment
          studentOptions={studentOptions}
          courseOptions={courseOptions}
          isSubmitting={createMutation.isPending}
          isAddingNew={isAddingNew}
          onToggleAdd={() => setIsAddingNew(!isAddingNew)}
          onCreate={handleCreateEnrollment}
        />

        <h2>Existing Enrollments ({enrollments?.length || 0})</h2>

        {enrollments?.length === 0 ? (
          <li className="no-data-li">No existing enrollments found.</li>
        ) : (
          enrollments?.map((enrollment: Enrollment) => (
            <EnrollmentListItem
              key={`${enrollment.courseId}-${enrollment.studentId}`}
              enrollment={enrollment}
            />
          ))
        )}
      </ul>
    </div>
  );
}
