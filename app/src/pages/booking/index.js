import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const Index = ({}) => {
  const home = useSelector((state) => state.home);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  // const {}

  useEffect(() => {
    // asyncActions.login(dispatch);
  }, [dispatch]);

  return (
    <View className={styles.index}>
      <View className={styles.content}>
        <AtForm onSubmit={() => {}}>
          <AtButton formType='submit'>提交</AtButton>
        </AtForm>
      </View>
      <Menu current={0} />
    </View>
  );
};

export default Index;
