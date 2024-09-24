import { NextResponse } from 'next/server';
import { middlewareChain } from './lib/middleware';
import type { NextFetchEvent, NextRequest } from 'next/server';

/**
 * リクエストに対するカスタムミドルウェア関数。
 * 指定されたミドルウェアチェーンを通じてリクエストを処理し、次のレスポンスを生成します。
 * @param req - Next.jsサーバーからのHTTPリクエストオブジェクト。
 * @param event - Fetchイベントオブジェクト、リクエストに関連するイベントを表します。
 * @returns 次のレスポンスオブジェクト。
 */
export function middleware(req: NextRequest, event: NextFetchEvent) {
  const next = async () => {
    return NextResponse.next();
  };
  return middlewareChain(req, event, next);
}

/** ミドルウェアの設定 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
