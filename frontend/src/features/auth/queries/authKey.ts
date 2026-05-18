export const authKeys = {
  all: ["auth"] as const,

  me: () => [...authKeys.all, "me"] as const,

  usersForAddMember: () => [...authKeys.all, "users-for-add-member"] as const,
};
