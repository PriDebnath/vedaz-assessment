import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export type User = {
  id: number;
  name: string;
  email: string;
    active: boolean;
};

const getUsers = () =>
  apiClient<User[]>("/api/v1/users", {
    method: "GET",
  });

export const useGetUsers = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    ...usersQuery,
    users: usersQuery.data ?? [],
  };
};