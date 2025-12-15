import React, { useState } from "react";
import { CoursesList } from "../CoursesList/CoursesList";
import { CourseManagement } from "../CourseManagement/CourseManagement";
import { EnrollmentManagement } from "../EnrollmentManagement/EnrollmentManagement";
import { Report } from "../Report/Report";
import { StudentsList } from "../StudentsList/StudentsList";

import "./Dashboard.css";

const TABS = {
  VIEW_COURSES: "Courses",
  VIEW_STUDENTS: "Students",
  MANAGE_COURSES: "Manage Courses",
  MANAGE_ENROLLMENT: "Enrollment",
  REPORT: "Report",
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABS.VIEW_COURSES);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.VIEW_COURSES:
        return <CoursesList />;
      case TABS.MANAGE_COURSES:
        return <CourseManagement />;
      case TABS.VIEW_STUDENTS:
        return <StudentsList />;
      case TABS.MANAGE_ENROLLMENT:
        return <EnrollmentManagement />;
      case TABS.REPORT:
        return <Report />;
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
