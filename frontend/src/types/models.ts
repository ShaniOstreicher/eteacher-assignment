// --- CORE ENTITIES ---

export type Course = {
  id: string;
  title: string;
  description?: string | null;
};

export type Student = {
  id: string;
  fullName: string;
};

export type Enrollment = {
  courseTitle: string;
  studentName: string;
  courseId: string;
  studentId: string;
};

// --- COMPOSITE TYPES ---

export type StudentWithCourses = Student & {
  courseTitles: string[];
};

export type CourseWithStudents = Course & {
  studentNames: string[];
};

// --- REQUEST / RESPONSE DTOs ---

export type CreateCourseRequest = Omit<Course, "id">;
export type UpdateCourseRequest = CreateCourseRequest;

export type ReportCreateResponse = {
  message: string;
  fileUrl: string;
};
