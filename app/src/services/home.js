import request from '../utils/request';

export const login = async (code) => {
  return await request({
    method: 'POST',
    url: `/wx/login`,
    data: { code },
    noToken: true,
  });
};

export const bind = async (data) => {
  return await request({
    method: 'POST',
    url: `/wx/bind`,
    data,
    noToken: true,
  });
};

export const getCanteenList = async () => {
  return await request({
    url: `/canteen/getCanteenList`,
  });
};

export const submitOrder = async (data) => {
  console.log(data);
  return await request({
    url: `/order/submit`,
    method: 'POST',
    data,
  });
};

export const getOrderList = async () => {
  return await request({
    url: `/order/get`,
  });
};
