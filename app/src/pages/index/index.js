import React, { useState, useEffect } from 'react';
import { View, Button } from '@tarojs/components';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput,
} from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const Index = ({}) => {
  const [empId, setEmpId] = useState('');
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { noBinding, openid } = home;

  useEffect(() => {
    asyncActions.login(dispatch);
  }, [dispatch]);

  return (
    <View className={styles.index}>
      <AtModal isOpened={noBinding} closeOnClickOverlay={false}>
        <AtModalHeader>工号绑定</AtModalHeader>
        <AtModalContent>
          <View>
            <AtInput
              type='text'
              placeholder='请输入您的员工号码以绑定信息'
              value={empId}
              onChange={(v) => {
                setEmpId(v);
              }}
            />
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button
            onClick={() => {
              if (empId && openid) {
                asyncActions.bind(dispatch, { empId, openid });
              }
            }}
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>
      <Menu current={1} />
    </View>
  );
};

export default Index;
