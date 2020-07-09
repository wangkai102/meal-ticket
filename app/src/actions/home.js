import Taro from '@tarojs/taro';
import * as homeService from '../services/home';

// 异步的action

export const login = async (dispatch) => {
  const { code } = await Taro.login();
  const result = await homeService.login(code);
  console.log(result);
  if (result.code === 0) {
    console.log(result.data);
  } else {
    if (result.data) {
      dispatch({
        type: 'save',
        payload: {
          noBinding: true,
          ...result.data,
        },
      });
    } else {
      Taro.showModal({
        title: '登录失败',
        content: result.msg,
      });
    }
  }
};

export const bind = async (dispatch, data) => {
  const result = await homeService.login(data);
  console.log(result);
  if (result.code === 0) {
    console.log(result.data);
  } else {
    if (result.data) {
      dispatch({
        type: 'save',
        payload: {
          noBinding: true,
          ...result.data,
        },
      });
    } else {
      Taro.showModal({
        title: '登录失败',
        content: result.msg,
      });
    }
  }
};
