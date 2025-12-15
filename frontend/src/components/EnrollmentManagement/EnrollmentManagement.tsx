import React, { useState } from "react";
import { useStudents } from "../../queries/students.queries";
import { useCourses } from "../../queries/courses.queries";
import {
  useEnrollments,
  useCreateEnrollment,
} from "../../queries/enrollments.queries";
import type { CreateEnrollmentRequest } from "../../services/enrollments.service";
import { CreateNewEnrollment } from "../CreateNewEnrollment/CreateNewEnrollment";
import { EnrollmentListItem } from "../EnrollmentListItem/EnrollmentListItem";
import type { Enrollment } from "../../types/models";
import "./EnrollmentManagement.css";

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
      },
      onError: (error: Error) => {
        alert(`Enrollment failed: ${error.message}`);
      },
    });
  };

  return (
    <div className="enrollment-management-container">
      <ul className="enrollment-management-list">
        <h2>Assign Student to Course</h2>

        <CreateNewEnrollment
          studentOptions={studentOptions}
          courseOptions={courseOptions}
          isSubmitting={createMutation.isPending}
          onCreate={handleCreateEnrollment}
        />
        <div className="assing-student-hint">
          (Hint: Try assigning a student to a course they are already in)
        </div>

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
