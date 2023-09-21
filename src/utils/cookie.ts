import cookies from 'js-cookie';
import { isDef } from './validation';

const option = {
  domain: window.location.host.includes('.q-gp.com') ? '.q-gp.com' : '',
  expires: 1,
};
const Cookies = {
  get(key: string): ReturnType<typeof JSON.parse> | ReturnType<typeof cookies.get> {
    let result = cookies.get(key);
    result = isDef(result) ? result : '';
    try {
      return JSON.parse(result as string);
    } catch (e) {
      return result;
    }
  },
  set(key: string, value: string | boolean | number | KeyObject): void {
    cookies.set(key, value as string, option);
  },
  clear(): void {
    Object.keys(cookies.get()).forEach(function (cookie) {
      Cookies.remove(cookie);
    });
  },
  remove(key: string): void {
    cookies.remove(key, option);
  },
};

export default Cookies;
