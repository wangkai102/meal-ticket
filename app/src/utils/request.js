import Taro from '@tarojs/taro';
import { SERVER_HOST } from './constant';

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  } else {
    let error = new Error(response.data);
    error.response = response;
    throw error;
  }
}
/**
 *  封装Taro-request请求方法，带Loading
 *
 * @export
 * @param {*} {
 *   url, 接口地址
 *   data,  请求的参数
 *   header,  设置请求的 header，
 *   method,  请求方法
 *   noLoading, 是否需要loading弹窗，true为不需要
 *   noToken, 是否在header携带token，true为不需要
 * }
 * @returns
 */
export default async function ({
  url,
  data,
  header,
  method = 'GET',
  noLoading = false,
  noToken = false,
}) {
  // 对header进行处理
  let reqHeader = {
    'content-type': 'application/json',
  };
  if (header) {
    reqHeader = header;
  }
  if (!noToken) {
    const { data: token } = await Taro.getStorage({ key: 'token' });
    console.log(token);
    reqHeader = { ...reqHeader, authorization: token };
  }
  // 对请求的参数进行处理
  let requestParam = {
    url: `${SERVER_HOST}${url}`,
    method,
    header: reqHeader,
  };
  if (data) {
    requestParam.data = data;
  }
  // 是否展示loading
  if (!noLoading) {
    Taro.showLoading({
      title: 'Loading',
    });
  }
  return await Taro.request(requestParam)
    .then((response) => checkStatus(response))
    .then((res) => {
      Taro.hideLoading();
      return res.data;
    })
    .catch((e) => e.response);
}
