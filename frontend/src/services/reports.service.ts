import { http } from "./http";
import type { ReportCreateResponse } from "../types/models";

export const reportService = {
  createAWS: () =>
    http<ReportCreateResponse>("/api/reports/AWS", {
      method: "POST",
    }),
};
