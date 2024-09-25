import { each } from 'lodash-es';
import parseCookie from './parseCookie';

/**
 * cookie名でset-cookie同士をマージします
 * @param baseCookie - マージ元のcookie
 * @param addCookie - 追加するcookie
 */
export const mergeCookie = (
  baseCookie: string | number | string[] | undefined,
  addCookie: string | number | string[] | undefined,
): string[] => {
  const result: string[] = [];
  const parsedBaseCookie = Array.isArray(baseCookie) ? parseCookie(baseCookie) : {};
  const parsedAddCookie = Array.isArray(addCookie) ? parseCookie(addCookie) : {};
  const mergedCookie = { ...parsedBaseCookie, ...parsedAddCookie };
  each(mergedCookie, (cookie) => result.push(cookie));
  return result;
};
