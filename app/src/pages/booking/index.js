import React, { useState, useEffect } from 'react';
import { View, Picker } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const Index = ({}) => {
  const home = useSelector((state) => state.home);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { canteenList } = home;

  useEffect(() => {
    asyncActions.getCanteenList(dispatch);
  }, [dispatch]);

  return (
    <View className={styles.index}>
      <View className={styles.content}>
        <AtForm onSubmit={() => {}}>
          <Picker
            mode='selector'
            range={['美国', '中国', '巴西', '日本']}
            onChange={(e)=>{
              console.log(e)
            }}
          >
            <AtList>
              <AtListItem
                title='国家地区'
                extraText='美国'
              />
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
