import type { Middleware } from '@/lib/middleware/index';

/**
 * リクエストログを出力するミドルウェア関数。
 * @param req - HTTPリクエストオブジェクト。
 * @param _event - Next.jsのフェッチイベントオブジェクト。
 * @param next - 次のミドルウェア関数または最終的なレスポンスを呼び出すコールバック関数。
 * @returns HTTPレスポンスオブジェクトを返すPromise。
 */
export const requestLogMiddleware: Middleware = async (req, _event, next) => {
  // const requestUUID = crypto.randomUUID();
  // console.info(
  //   `[${requestUUID}][${new Date().toISOString()}] [Request ]     ${req.method} ${req.url}`,
  // );

  const response = await next();

  // console.info(
  //   `[${requestUUID}][${new Date().toISOString()}] [Response] ${
  //     response.status
  //   } ${req.method} ${req.url}`,
  // );

  return response;
};
