/** APIのレスポンス値に使用します */
export interface IApiResponse<T> {
  data: T;
  status: IApiResponseStatus;
}

export interface IApiResponseStatus {
  errors: ErrorNames[];
  isSuccess: boolean;
  statusCode?: number;
}

// TODO BEと共有する
// TODO これをFEでローカライズしてエラーメッセージを表示する
export enum ErrorNames {
  E_SERVER_ERROR = 'E_SERVER_ERROR', // 500 Internal Server Error
  E_NETWORK_ERROR = 'E_NETWORK_ERROR', // Network connection issues
  E_NOT_FOUND = 'E_NOT_FOUND', // 404 Not Found
  E_UNAUTHORIZED = 'E_UNAUTHORIZED', // 401 Unauthorized
}
