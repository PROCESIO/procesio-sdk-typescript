export interface RequestParams {
  url: string;
  bearerToken: string;
  workspace: string;
  body?: unknown;
  method?: RequestMethods;
}

export interface RestResponse<T> {
  status: number;
  isError: boolean;
  errorContent?: ErrorContent[];
  content?: T;
}

export interface ErrorContent {
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
  bearerToken,
  url,
  method = RequestMethods.POST,
  workspace = "",
  body,
}: RequestParams) {
  const headers = new Headers();

  headers.set("Content-type", "application/json");

  headers.set("Authorization", `Bearer ${bearerToken}`);

  headers.set("realm", "procesio01");

  headers.set("workspace", workspace);

  const req = await fetch(`https://api.procesio.app:4321/api/${url}`, {
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
