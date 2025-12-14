import { http } from "./http";
import type { Student } from "../types/models";

export const studentsService = {
  getAll: () => http<Student[]>("/api/students"),
};
