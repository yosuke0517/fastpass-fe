import type { IApiResponse } from '@/types/api/common';
import { mergeCookie } from '@/utils/cookie/mergeCookie';
import type { GetServerSidePropsContext, NextPageContext } from 'next';

export interface ApiClientInterface {
  get: <T>(url: string, config?: RequestInit) => Promise<IApiResponse<T>>;
  post: <RequestData, T>(
    url: string,
    data: RequestData,
    config?: RequestInit,
  ) => Promise<IApiResponse<T>>;
  put: <RequestData, T>(
    url: string,
    data: RequestData,
    config?: RequestInit,
  ) => Promise<IApiResponse<T>>;
}

/**
 * APIクライアント
 * @param ctx サーバーサイドのコンテキスト
 */
export class ApiClient implements ApiClientInterface {
  private readonly ctx?: GetServerSidePropsContext | NextPageContext;

  constructor(ctx?: GetServerSidePropsContext | NextPageContext) {
    this.ctx = ctx;
  }

  // サーバーサイドでクッキーを設定
  // TODO server action でやってもいいかも
  private setCookies(response: Response) {
    if (!this.ctx) return;
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      const mergedCookie = mergeCookie(this.ctx.res?.getHeader('set-cookie'), setCookieHeader);
      this.ctx.res?.setHeader('set-cookie', mergedCookie);
    }
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<IApiResponse<T>> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...((this.ctx?.req?.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    this.setCookies(response);
    const data = await response.json();
    return {
      data,
      status: {
        errors: [],
        isSuccess: true,
        statusCode: response.status,
      },
    };
  }

  /**
   * GETリクエスト
   * @param url リクエストURL
   * @param config リクエスト設定
   */
  async get<T>(url: string, config?: RequestInit): Promise<IApiResponse<T>> {
    return this.request<T>(url, { method: 'GET', ...config });
  }

  /**
   * POSTリクエスト
   * @param url リクエストURL
   * @param data リクエストデータ
   * @param config リクエスト設定
   */
  async post<RequestData, T>(
    url: string,
    data: RequestData,
    config?: RequestInit,
  ): Promise<IApiResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
  }

  /**
   * PUTリクエスト
   * @param url リクエストURL
   * @param data リクエストデータ
   * @param config リクエスト設定
   */
  async put<RequestData, T>(
    url: string,
    data: RequestData,
    config?: RequestInit,
  ): Promise<IApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
