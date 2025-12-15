import { useEnrollments } from "../queries/enrollments.queries";
import { useStudents } from "../queries/students.queries";
import { useCourses } from "../queries/courses.queries";
import "./Report.css";

export function Report() {
  const { data: enrollments, isLoading: isLoadingEnrollments } =
    useEnrollments();
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: courses, isLoading: isLoadingCourses } = useCourses();

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
    </div>
  );
}
