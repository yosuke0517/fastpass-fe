// import { NextResponse } from 'next/server';
import type { Middleware } from '@/lib/middleware/index';

/**
 * 認証ミドルウェア関数。
 * @param req - HTTPリクエストオブジェクト。
 * @param _event - Next.jsのフェッチイベントオブジェクト。
 * @param next - 次のミドルウェア関数または最終的なレスポンスを呼び出すコールバック関数。
 * @returns HTTPレスポンスオブジェクトを返すPromise。
 */
export const authMiddleware: Middleware = async (req, _event, next) => {
  console.info('authMiddleware'); // TODO 確認用 あとで消す
  // TODO 要件かたまり次第清書
  // const sessionId = req.cookies.get('sessionId');
  // const NO_AUTH_PATHS = ['/', '/login']; // TODO 定数から取得するように変更
  // if (!sessionId && !NO_AUTH_PATHS.includes(req.nextUrl.pathname)) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  return next();
};
