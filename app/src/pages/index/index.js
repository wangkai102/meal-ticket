import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Button, ScrollView } from '@tarojs/components';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput,
  AtIcon,
} from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const Index = () => {
  const [empId, setEmpId] = useState('');
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { noBinding, openid } = home;
  useEffect(() => {
    const init = async () => {
      try {
        const userInfo = await Taro.getStorage({ key: 'user' });
        dispatch({
          type: 'save',
          payload: {
            user: userInfo.data,
          },
        });
        await asyncActions.getOrderList(dispatch);
      } catch (error) {
        await asyncActions.login(dispatch);
      }
    };
    init();
  }, [dispatch]);

  return (
    <View className={styles.index}>
      <View className={styles.orderWrap}>
        <ScrollView scrollY scrollWithAnimation className={styles.orderList}>
          <View className={styles.item}>
            <View className={styles.info}>
              <View className={styles.date}>今日午餐</View>
              <View className={styles.status}>未就餐</View>
            </View>
            <View className={styles.canteen}>
              <AtIcon value="home" />
              就餐食堂: 东三食堂
            </View>
          </View>
        </ScrollView>
      </View>

      <AtModal isOpened={noBinding} closeOnClickOverlay={false}>
        <AtModalHeader>工号绑定</AtModalHeader>
        <AtModalContent>
          <View>
            <AtInput
              type="text"
              placeholder="请输入您的员工号码以绑定信息"
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
