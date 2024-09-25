/**
 * set-cookieの値をcookie名ごとに分解します
 *
 * ex)
 *   parseCookie(['hoge=XXX; expires=7200; Max-Age=YYY', 'foo=ZZZ; expires=7200; Max-Age=AAA'])
 *   { hoge: 'hoge=XXX; expires=7200; Max-Age=YYY', foo: 'foo=ZZZ; expires=7200; Max-Age=AAA' }
 * @param cookies - set-cookieの値
 */
const parseCookie = (cookies: string[]): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  cookies.forEach((cookie) => {
    const cookieKey = cookie.match(/^(\S*?)=(\S*?);/);
    if (cookieKey) {
      result[cookieKey[1]] = cookie;
    }
  });
  return result;
};

export default parseCookie;
