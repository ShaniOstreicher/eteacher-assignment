import { useQuery } from "@tanstack/react-query";
import { coursesService } from "../services/courses.service";

export const coursesKeys = {
  all: ["courses"] as const,
  allWithStudents: ["courses"] as const,
};

export function useCoursesWithStudents() {
  return useQuery({
    queryKey: coursesKeys.all,
    queryFn: coursesService.getAllWithStudents,
  });
}
