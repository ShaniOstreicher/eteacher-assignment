import { useQuery } from "@tanstack/react-query";
import { studentsService } from "../services/students.service";

export const studentsKeys = {
  all: ["students"] as const,
  allWithCourses: ["allWithCourses"] as const,
};

export function useStudentsWithCourses() {
  return useQuery({
    queryKey: studentsKeys.allWithCourses,
    queryFn: studentsService.getAllWithStudents,
  });
}
