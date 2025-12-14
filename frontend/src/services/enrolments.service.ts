import { http } from "./http";
import type { Enrollment } from "../types/models";

export type CreateEnrolmentRequest = {
  courseId: string;
  studentId: string;
};

export const enrolmentsService = {
  getAll: () => http<Enrollment[]>("/api/enrolments"),
  create: (body: CreateEnrolmentRequest) =>
    http<Enrollment>("/api/enrolments", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
