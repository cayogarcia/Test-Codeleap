import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Post } from "../types/Post";

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get("/careers/");
      return data.results ?? [];
    }
  });
}