import config from '@/config';
import http from '@/utils/http';
import { OrderList, OrderListParams } from './model';

const { apiHost } = config;

// 获取订单
export const getOrderList = (params: OrderListParams) => {
  return http.post<OrderList>(`${apiHost}/quantgroup/delivery/app/order/pageList`, params, {
    emulateJSON: true,
  });
};

// 【APP】綫路管理-根据线路id查询用户信息
export const getRouteUserList = (params: OrderListParams) => {
  return http.get<OrderList>(`${apiHost}/quantgroup/delivery/admin/routeUser`, { params });
};
