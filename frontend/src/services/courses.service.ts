import { http } from "./http";
import type { Course } from "../types/models";

export type CreateCourseRequest = {
  title: string;
  description?: string | null;
};

export type UpdateCourseRequest = {
  title: string;
  description?: string | null;
};

export const coursesService = {
  getAll: () => http<Course[]>("/api/courses"),
  create: (body: CreateCourseRequest) =>
    http<Course>("/api/courses", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  update: (id: string, body: UpdateCourseRequest) =>
    http<void>(`/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  remove: (id: string) =>
    http<void>(`/api/courses/${id}`, { method: "DELETE" }),
};
