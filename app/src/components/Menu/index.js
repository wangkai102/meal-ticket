import React from 'react';
import Taro from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';

const Menu = ({ current }) => {
  return (
    <AtTabBar
      fixed
      tabList={[
        { title: '预定饭票', iconType: 'add-circle' },
        { title: '我的饭票', iconType: 'bullet-list', text: 'new' },
        { title: '个人信息', iconType: 'user' },
      ]}
      onClick={(e) => {
        let page = '';
        switch (e) {
          case 0:
            page = 'booking';
            break;
          case 1:
            page = 'index';
            break;
          case 2:
            page = 'my';
            break;
        }
        Taro.navigateTo({
          url: `/pages/${page}/index`,
        });
      }}
      current={current}
    />
  );
};

export default Menu;
