import { QueryParam } from "./types.ts";

export const buildQueryParams = (queryParams: QueryParam[]): string => {
  let queryString = "";
  queryParams.forEach((queryParam) => {
    if (queryString) {
      queryString += `&${queryParam.key}=${queryParam.value}`;
    } else {
      queryString = `?${queryParam.key}=${queryParam.value}`;
    }
  });

  return queryString;
};
