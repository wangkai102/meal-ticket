import Taro from '@tarojs/taro';
import * as homeService from '../services/home';

// 异步的action

export const login = async (dispatch) => {
  const { code } = await Taro.login();
  const result = await homeService.login(code);
  console.log(result);
  if (result.code === 0) {
    await Taro.setStorage({ key: 'user', data: result.data });
    await Taro.setStorage({ key: 'token', data: result.data.token });
    dispatch({
      type: 'save',
      payload: {
        user: result.data,
      },
    });
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
  const result = await homeService.bind(data);
  console.log(result);
  if (result.code === 0) {
    await Taro.setStorage({ key: 'user', data: result.data });
    await Taro.setStorage({ key: 'token', data: result.data.token });
    dispatch({
      type: 'save',
      payload: {
        noBinding: false,
        user: result.data,
      },
    });
  } else {
    Taro.showModal({
      title: '绑定失败',
      content: result.msg,
    });
  }
};

export const getCanteenList = async (dispatch) => {
  const result = await homeService.getCanteenList();
  console.log(result);
  if (result.code === 0) {
    dispatch({
      type: 'save',
      payload: {
        canteenList: result.data,
      },
    });
  } else {
    Taro.showModal({
      title: '失败',
      content: result.msg,
    });
  }
};
