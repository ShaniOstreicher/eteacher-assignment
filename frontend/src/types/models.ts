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
  courseId: string;
  studentId: string;
};

export type CourseWithStudents = {
  course: Course;
  students: Student[];
};
