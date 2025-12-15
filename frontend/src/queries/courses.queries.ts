import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  coursesService,
  type CreateCourseRequest,
  type UpdateCourseRequest,
} from "../services/courses.service";

export const coursesKeys = {
  all: ["courses"] as const,
  allWithStudents: ["allWithStudents"] as const,
};

export function useCoursesWithStudents() {
  return useQuery({
    queryKey: coursesKeys.allWithStudents,
    queryFn: coursesService.getAllWithStudents,
  });
}

export function useCourses() {
  return useQuery({
    queryKey: coursesKeys.all,
    queryFn: coursesService.getAll,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCourseData: CreateCourseRequest) =>
      coursesService.create(newCourseData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.all });
      queryClient.invalidateQueries({ queryKey: coursesKeys.allWithStudents });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      courseToUpdate,
    }: {
      id: string;
      courseToUpdate: UpdateCourseRequest;
    }) => coursesService.update(id, courseToUpdate),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.all });
      queryClient.invalidateQueries({ queryKey: coursesKeys.allWithStudents });
    },
  });
}
