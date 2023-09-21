import axios from 'axios';
import type { Canceler } from 'axios';

const ERR_MESSAGE_MAP: Record<number, string> = {
  400: '错误请求',
  401: '您未登录或登录超时，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
};

const config = {
  timeout: 15000,
};
const CancelToken = axios.CancelToken;
const instance = axios.create(config);

const pending: Record<string, Canceler> = {};
let reqNum = 0;
let timeId: ReturnType<typeof setTimeout>;

function beforeRequest() {
  reqNum++;
  clearTimeout(timeId);
  timeId = setTimeout(() => {
    console.log('change_loading');
  }, 1300);
}

function afterRequest() {
  reqNum--;
  if (reqNum <= 0) {
    clearRequest();
    console.log('change_loading_false');
  }
}

function clearRequest() {
  clearTimeout(timeId);
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    !config.hideLoading && beforeRequest();
    // 发起请求时，取消掉当前正在进行的相同请求
    // 发起请求时，取消掉当前正在进行的相同请求
    if (pending[config.url!]) {
      pending[config.url!]('取消重复请求');
    }
    config.cancelToken = new CancelToken((c) => (pending[config.url!] = c));

    // 此处加处理
    return config;
  },
  (error) => {
    return [null, error];
  },
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  (response) => {
    if (response.config?.url) {
      !response.config.hideLoading && afterRequest();
      delete pending[response.config?.url || ''];
    }
    // 此处添加相应处理
    return response.data;
  },
  (err) => {
    !err.config.hideLoading && afterRequest();

    let message = '';
    let showToast = true;

    if (err.message === 'Network Error' && !err.response) {
      // 网络异常: 错误域名，
      message = '服务不可用';
    } else if (err.response && err.response?.status) {
      message = ERR_MESSAGE_MAP[+err.response?.status] || `未知异常码: ${err.response?.status}`;
    } else if (err.message === '取消重复请求') {
      message = '取消重复请求';
      showToast = false;
    }
    showToast && alert(message || '服务异常，请稍后重试');
    const error = new Error(message);
    console.error(error);
    return [null, error];
  },
);
export default instance;
