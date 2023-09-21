// axios声明扩展
export interface BaseResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

export declare module 'axios' {
  interface AxiosRequestConfig {
    rawData?: boolean;
    customHeader?: KeyObject;
    hideLoading?: boolean;
    strategy?: string;
    hideToastNoLogin?: boolean;
    hideToast?: boolean;
    emulateJSON?: boolean;
  }
  interface AxiosResponse<T> {
    data: BaseResponseData<T>;
  }
}
