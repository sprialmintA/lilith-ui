import { isDef } from './validation';

export default {
  get(key: string): ReturnType<typeof JSON.parse> | ReturnType<typeof window.localStorage.getItem> {
    let result = window.localStorage.getItem(key);
    result = isDef(result) ? result : '';
    try {
      return JSON.parse(result as string);
    } catch (e) {
      return result;
    }
  },
  set(key: string, value: string | boolean | number | KeyObject): void {
    const toString = Object.prototype.toString;
    if (toString.call(value) === '[object Array]' || toString.call(value) === '[object Object]') {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value as string);
  },
  remove(key: string): void {
    return window.localStorage.removeItem(key);
  },
  clear(): void {
    return window.localStorage.clear();
  },
};
