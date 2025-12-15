import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reportService } from "../services/reports.service";

export const reportsKeys = {
  createAWSReport: ["createAWSReport"] as const,
};

export function useCreateAWSReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.createAWS,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportsKeys.createAWSReport });
    },
  });
}
