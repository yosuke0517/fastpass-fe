import { NextResponse } from 'next/server';
import type { Middleware } from '@/lib/middleware/index';

/**
 * ボットアクセスをブロックするミドルウェア関数。
 * @param req - HTTPリクエストオブジェクト。
 * @param _event - Next.jsのフェッチイベントオブジェクト。
 * @param next - 次のミドルウェア関数または最終的なレスポンスを呼び出すコールバック関数。
 * @returns HTTPレスポンスオブジェクトを返すPromise。
 */
export const blockBotMiddleware: Middleware = async (req, _event, next) => {
  console.info('blockBotMiddleware'); // TODO 確認用 あとで消す
  const userAgent = req.headers.get('user-agent');
  if (userAgent && userAgent.includes('bot')) {
    return new NextResponse('Access denied', { status: 403 });
  }

  return next();
};
