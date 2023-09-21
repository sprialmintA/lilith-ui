/*eslint-disable*/

const ua = window.navigator.userAgent.toLowerCase();
// 判断微信环境
export const isWechat = !!ua.match(/microMessenger/i);

// 判断微信小程序环境
export const isWxMp = !!ua.match(/miniProgram/i) || window.__wxjs_environment === 'miniprogram';

// 判断是不是在app
export const isApp = /delivery/.test(ua);

// 判断IOS环境
export const isIOS = /iphone|ipad|ipod/.test(ua);

// 判读Android环境
export const isAndroid = /android/.test(ua);

// 判断
export const appVersion = ua.match(/delivery\/([\d|.]+)/)
  ? (ua.match(/delivery\/([\d|.]+)/) as string[])[1]
  : '1.0.00';

export const isQQ = !!ua.match(/QQ/i);

export const isWeiBo = !!ua.match(/Weibo/i);

export const isDingTalk = !!ua.match(/DingTalk/i);

// 判读非微信浏览器和appwebview和小程序webview
export const isH5Normal = !isWechat && !isWxMp && !isApp;

// 判断输入内容是否为空
export function isNull(str: any) {
  return str === undefined || str.length === 0 || str === null;
}

// 判断输入内容是否为正常
export function isDef(val: any) {
  return val !== undefined && val !== null && val !== 'null' && val !== 'undefined';
}
