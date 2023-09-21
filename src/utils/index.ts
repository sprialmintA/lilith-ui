import { isIOS } from './validation';

/**
 * @description: IOS更新tab标题
 * @param {string} title 标题
 * @return {void}
 */
export const changeDocumentTitle = (title: string) => {
  document.title = title;
  if (isIOS) {
    const hackIframe = document.createElement('iframe');
    hackIframe.style.display = 'none';
    hackIframe.src = '/fixIosTitle.html?r=' + Math.random();
    document.body.appendChild(hackIframe);
    const titleTimer = setTimeout(() => {
      document.body.removeChild(hackIframe);
      clearTimeout(titleTimer);
    }, 300);
  }
};

/**
 * hash路由获取url参数
 * @param {String} searchString  输入字符串
 * @return: {String} str 字符串
 */
export function parseSearch(searchString: string) {
  if (!searchString) {
    return {};
  }
  if (!searchString.includes('?')) {
    return {};
  }
  return searchString
    .split('?')[1]
    .split('#')[0]
    .split('&')
    .reduce((result: Record<string, string | number | boolean>, next) => {
      const pair = next.split('=');
      try {
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      } catch (e) {
        // eslint-disable-next-line
        //   result[decodeURIComponent(pair[0])] = window.$URL.decode(pair[1]);
      }
      return result;
    }, {});
}

/**
 * @description: 时间格式转换
 * @param {null | string | Date | number} 时间
 * @param {string} cFormat 时间格式, 默认: {y}-{m}-{d} {h}:{i}:{s}
 * @param {boolean} delZero 时间小于10,是否补零
 * @return {string} 时间
 */
export function parseTime(time: null | string | Date | number, cFormat: string, delZero?: boolean) {
  if (arguments.length === 0) {
    return '-';
  }
  if (time === null) {
    return '-';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (time === '') {
    date = new Date();
  } else if (typeof time === 'object') {
    date = time;
  } else if (!isNaN(time as number) && ('' + time).length === 10) {
    time = parseInt(time as string) * 1000;
  } else {
    if (String(time).includes('T')) {
      time = (time as string).replace(/T/g, ' ').replace(/\..*/g, '');
    }
    if (String(time).includes('-') || String(time).includes('.')) {
      time = (time as string).replace(/-|\./g, '/');
    }
    date = new Date(time);
  }
  if (!date) return '';
  const formatObj: Record<string, number> = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key): string => {
    const value = formatObj[key] as number;
    let smallValue = '';
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10 && !delZero) {
      smallValue = '0' + value;
    }
    return smallValue || '' + value || '0';
  });

  return timeStr;
}
/**
 * @description: 日期转换为昨天|今天|明天
 * @param {string} str 日期
 * @return {string} 昨天|今天|明天
 */
export function transDayTag(str: string): string {
  const d = new Date(str).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  const obj = {
    '-86400000': '昨天',
    0: '今天',
    86400000: '明天',
  } as Record<number, string>;

  return obj[d - today] || str;
}

/**
 * @description: 比较版本号
 * @param {string} v1 版本1
 * @param {string} v2 版本2
 * @return {number} 0是相等， 1是v1>v2, -1是v1<v2, -2是不存在
 */
export function compareVersion(v1: string, v2: string): number {
  if (!v1 || !v2) return -2;
  const v1Arr = v1.split('.');
  const v2Arr = v2.split('.');
  const len = Math.max(v1Arr.length, v2Arr.length);

  while (v1Arr.length < len) {
    v1Arr.push('0');
  }
  while (v2Arr.length < len) {
    v2Arr.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1Arr[i]);
    const num2 = parseInt(v2Arr[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

export function getObjProperty(obj: KeyObject, str: string) {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // 处理数组下标
  const arr = str.split('.');
  for (const i in arr) {
    obj = obj[arr[i]] || '';
  }
  return obj;
}
