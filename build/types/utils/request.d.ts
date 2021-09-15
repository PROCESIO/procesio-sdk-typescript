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
export declare enum RequestMethods {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
export declare function request<T>({ bearerToken, url, method, workspace, body, }: RequestParams): Promise<RestResponse<T>>;
