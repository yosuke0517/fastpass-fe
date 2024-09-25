import { authMiddleware } from '@/lib/middleware/authMiddleware';
import { blockBotMiddleware } from '@/lib/middleware/blockBotMiddleware';
import { requestLogMiddleware } from '@/lib/middleware/requestLogMiddleware';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

/**
 * ミドルウェア関数の型定義。
 * @param {NextRequest} req - HTTPリクエストオブジェクト。
 * @param {NextFetchEvent} event - Next.jsのフェッチイベントオブジェクト。
 * @param {Function} next - 次のミドルウェア関数または最終的なレスポンスを呼び出すコールバック関数。
 * @returns {Promise<NextResponse>} HTTPレスポンスオブジェクトを返すPromise。
 */
export type Middleware = (
  req: NextRequest,
  event: NextFetchEvent,
  next: () => Promise<NextResponse>,
) => Promise<NextResponse>;

/**
 * ミドルウェアチェーンを作成する関数の型定義。
 * @param {NextRequest} request - HTTPリクエストオブジェクト。
 * @param {NextFetchEvent} event - Next.jsのフェッチイベントオブジェクト。
 * @param {Function} next - 次のミドルウェア関数または最終的なレスポンスを呼び出すコールバック関数。
 * @returns {Promise<NextResponse>} HTTPレスポンスオブジェクトを返すPromise。
 */
type MiddlewareChain = (
  request: NextRequest,
  event: NextFetchEvent,
  next: () => Promise<NextResponse>,
) => Promise<NextResponse>;

/**
 * ミドルウェアをチェーンして実行するための関数を作成する。
 * @param middlewares - チェーンするミドルウェア関数の可変長引数リスト。
 * @returns ミドルウェアチェーンを処理する関数。
 */
export const createMiddlewareChain = (...middlewares: Middleware[]): MiddlewareChain => {
  // 実行する関数を返す
  return async (req, event, next) => {
    /**
     * ミドルウェアを順番に実行する関数。
     * @param index - 現在実行中のミドルウェアのインデックス。
     * @returns 実行結果としてのHTTPレスポンスオブジェクトを返すPromise。
     */
    const executeMiddleware = (index: number): Promise<NextResponse> => {
      // ミドルウェアがある場合は実行する
      const middleware = middlewares[index];
      if (middleware) {
        return middleware(req, event, async () => executeMiddleware(index + 1));
      }

      // ミドルウェアがない場合は次の処理を実行する（= 全てのミドルウェアが実行済み）
      return next();
    };

    return executeMiddleware(0);
  };
};

/**
 * ミドルウェアチェーンを作成する。
 * 追加のミドルウェアをここで指定することで、リクエスト処理のカスタマイズが可能。
 */
export const middlewareChain = createMiddlewareChain(
  requestLogMiddleware,
  blockBotMiddleware,
  authMiddleware,
);
