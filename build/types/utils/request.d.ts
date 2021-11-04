export interface RequestParams {
    base: string;
    url: string;
    bearerToken: string;
    workspace: string;
    body?: unknown;
    method?: RequestMethods;
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
export declare enum RequestMethods {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
export declare function request<T>({ base, bearerToken, url, method, workspace, body, }: RequestParams): Promise<RestResponse<T>>;
