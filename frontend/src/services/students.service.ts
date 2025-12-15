import { http } from "./http";
import type { Student, StudentWithCourses } from "../types/models";

export const studentsService = {
  getAll: () => http<Student[]>("/api/students"),
  getAllWithStudents: () =>
    http<StudentWithCourses[]>("/api/students?include=courses"),
};
