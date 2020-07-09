import React from 'react';
import { AtTabBar } from 'taro-ui';

const Menu = ({ current }) => {
  return (
    <AtTabBar
      fixed
      tabList={[
        { title: '预定吃饭', iconType: 'add-circle' },
        { title: '我的饭票', iconType: 'bullet-list', text: 'new' },
        { title: '个人信息', iconType: 'user' },
      ]}
      onClick={(e) => {
        console.log(e)
      }}
      current={current}
    />
  );
};

export default Menu;
