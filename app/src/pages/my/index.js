import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const Index = ({}) => {
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    // asyncActions.login(dispatch);
  }, [dispatch]);

  return (
    <View className={styles.index}>
      我的
      <Menu current={2} />
    </View>
  );
};

export default Index;
