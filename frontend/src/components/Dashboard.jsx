import React, { useState } from "react";
import { CoursesList } from "./CoursesList";
import { CourseManagement } from "./CourseManagement";
import { EnrollmentForm } from "./EnrollmentForm";
import { EnrollmentReport } from "./EnrollmentReport";
import "./Dashboard.css";

const TABS = {
  VIEW_ENROLLMENTS: "Courses & Students",
  MANAGE_COURSES: "Manage Courses",
  ENROLLMENT_FORM: "Enrollment",
  REPORT: "Report",
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABS.VIEW_ENROLLMENTS);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.VIEW_ENROLLMENTS:
        return <CoursesList />;
      case TABS.MANAGE_COURSES:
        return <CourseManagement />;
      case TABS.ENROLLMENT_FORM:
        return <EnrollmentForm />;
      case TABS.REPORT:
        return <EnrollmentReport />;
      default:
        return <CoursesList />;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="tabs-nav">
        {Object.values(TABS).map((tabName) => (
          <button
            key={tabName}
            className={`tab-button ${activeTab === tabName ? "active" : ""}`}
            onClick={() => setActiveTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </nav>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
