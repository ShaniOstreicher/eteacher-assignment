import { useEffect } from "react";
import { useEnrollments } from "../../queries/enrollments.queries";
import { useStudents } from "../../queries/students.queries";
import { useCourses } from "../../queries/courses.queries";
import { useCreateAWSReport } from "../../queries/reports.queries";

import "./Report.css";

export function Report() {
  const { data: enrollments } = useEnrollments();
  const { data: students } = useStudents();
  const { data: courses } = useCourses();

  const {
    data: AWSReportResponse,
    mutate: createAWSReport,
    reset,
  } = useCreateAWSReport();

  useEffect(() => {
    if (AWSReportResponse) {
      const message = `
        ${AWSReportResponse.message}
        
        Mock URL: ${AWSReportResponse.fileUrl}
        
      `;
      alert(message);

      reset();
    }
  }, [AWSReportResponse, reset]);

  const widgets = [
    {
      title: "Total Enrollments",
      value: enrollments?.length,
    },
    {
      title: "Total Courses",
      value: courses?.length,
    },
    {
      title: "Total Students",
      value: students?.length,
    },
  ];

  return (
    <div className="report-container">
      <div className="report-widgets-grid">
        {widgets.map((widget, index) => (
          <div key={index} className={`widget-card`}>
            <div className="widget-header">
              <h3 className="widget-title">{widget.title}</h3>
            </div>
            <div className="widget-content">
              <span className="widget-value">{widget.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="export-button-wrapper">
        <button onClick={() => createAWSReport()} className="aws-export-button">
          Export AWS report
        </button>
      </div>
    </div>
  );
}
