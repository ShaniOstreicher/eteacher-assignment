import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  enrollmentsService,
  type CreateEnrollmentRequest,
} from "../services/enrollments.service";

export const enrollmentsKeys = {
  all: ["enrollments"] as const,
};

export function useEnrollments() {
  return useQuery({
    queryKey: enrollmentsKeys.all,
    queryFn: enrollmentsService.getAll,
  });
}

export function useCreateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEnrollmentData: CreateEnrollmentRequest) =>
      enrollmentsService.create(newEnrollmentData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentsKeys.all });
    },
  });
}
