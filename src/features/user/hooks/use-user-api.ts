import { FindAllUsersResponse, User } from "../types.ts";
import { buildQueryParams } from "../../api/functions.ts";
import { ApiMethod } from "../../api/types.ts";
import { routes } from "../../api/constants.ts";
import { useAuthContext } from "../../auth/hooks/use-auth-context.ts";

export const useUserApi = () => {
  const { sendAuthGuardedRequest } = useAuthContext();

  const findAllUsers = async (
    limit: number,
    offset: number,
  ): Promise<FindAllUsersResponse> => {
    const queryString = buildQueryParams([
      { key: "limit", value: limit.toString() },
      { key: "offset", value: offset.toString() },
    ]);

    return sendAuthGuardedRequest(
      ApiMethod.GET,
      routes.user.findAll + queryString,
    );
  };

  const findOneUser = async (id: number): Promise<User> => {
    return sendAuthGuardedRequest(ApiMethod.GET, routes.user.findOne(id));
  };

  return { findAllUsers, findOneUser };
};
