export enum ApiMethod {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type QueryParam = {
  key: string;
  value: string;
};
