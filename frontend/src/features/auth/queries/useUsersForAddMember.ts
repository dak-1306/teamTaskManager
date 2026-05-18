import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import { authKeys } from "./authKey";

export const useUsersForAddMember = () => {
  return useQuery({
    queryKey: authKeys.usersForAddMember(),

    queryFn: userApi.getUsersForAddMemberProject,
  });
};
