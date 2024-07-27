export type User = {
  id: number;
  email: string;
};

export type FindAllUsersResponse = { results: User[]; total: number };
