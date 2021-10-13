import { ApiKeyCredential } from "../types";

export interface RequestParams {
  base: string;
  url: string;
  workspace: string;
  bearerToken?: string;
  body?: unknown;
  method?: RequestMethods;
  apiKey?: ApiKeyCredential;
}

export interface RestResponse<T> {
  status: number;
  isError: boolean;
  errorContent?: ErrorResponse[];
  content?: T;
}

export interface ErrorResponse {
  statusCode: number;
  target: string;
  value: string;
}

export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export async function request<T>({
  base,
  bearerToken,
  apiKey,
  url,
  method = RequestMethods.POST,
  workspace = "",
  body,
}: RequestParams) {
  const headers = new Headers();

  headers.set("Content-type", "application/json");

  if (bearerToken) {
    headers.set("Authorization", `Bearer ${bearerToken}`);
  }

  if (apiKey?.name && apiKey?.value) {
    headers.set("key", apiKey.name);
    headers.set("value", apiKey.value);
  }

  headers.set("realm", "procesio01");

  headers.set("workspace", workspace);

  const req = await fetch(`${base}:4321/api/${url}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  const status = req.status;

  if (req.status === 401) {
    // refresh token
  }

  const resp = await req.json();

  const isBadRequest = status !== 200;

  const response: RestResponse<T> = {
    status,
    isError: isBadRequest,
    errorContent: isBadRequest ? resp : null,
    content: isBadRequest ? null : resp,
  };
  return response;
}
