import { http } from "./http";
import type { Enrollment } from "../types/models";

export type CreateEnrollmentRequest = {
  courseId: string;
  studentId: string;
};

export const enrollmentsService = {
  getAll: () => http<Enrollment[]>("/api/enrollments"),
  create: (body: CreateEnrollmentRequest) =>
    http<Enrollment>("/api/enrollments", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
