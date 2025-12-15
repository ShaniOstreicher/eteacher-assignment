import React from "react";
import "./EnrollmentManagement.css";
import type { Enrollment } from "../types/models";

interface EnrollmentListItemProps {
  enrollment: Enrollment;
}

export function EnrollmentListItem({ enrollment }: EnrollmentListItemProps) {
  console.log({ enrollment });
  return (
    <li className="enrollment-management-item enrollment-item-view">
      <div className="enrollment-data-area">
        <div className="enrollment-item-field">
          <label>Course:</label>
          <div className="enrollment-course-title">
            {enrollment.courseTitle}
          </div>
        </div>

        <div className="enrollment-item-field">
          <label>Student:</label>
          <span className="enrollment-student-name">
            {enrollment.studentName}
          </span>
        </div>
      </div>

      <div className="action-buttons"></div>
    </li>
  );
}
