import React, { useState, useEffect } from 'react';
import { View, Picker } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const Index = ({}) => {
  const home = useSelector((state) => state.home);
  const [formData, setFormData] = useState({
    canteen: {
      value: undefined,
      text: '请选择',
    },
  });
  const dispatch = useDispatch();
  const { canteenList } = home;
  console.log(canteenList);
  useEffect(() => {
    asyncActions.getCanteenList(dispatch);
  }, [dispatch]);

  const { canteen } = formData;
  return (
    <View className={styles.index}>
      <View className={styles.content}>
        <AtForm onSubmit={() => {}}>
          <Picker
            mode='selector'
            range={canteenList}
            rangeKey='name'
            onChange={(e) => {
              const { value } = e.detail;
              setFormData({
                ...formData,
                canteen: {
                  value,
                  text: canteenList[value].name,
                },
              });
              console.log(e);
            }}
          >
            <AtList>
              <AtListItem title='就餐食堂' extraText={canteen.text} />
            </AtList>
          </Picker>
          <AtButton formType='submit'>提交</AtButton>
        </AtForm>
      </View>
      <Menu current={0} />
    </View>
  );
};

export default Index;
