import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

import Menu from '../../components/Menu/index';

const timeData = [
  {
    value: 0,
    text: '早餐',
  },
  {
    value: 1,
    text: '午餐',
  },
  {
    value: 2,
    text: '晚餐',
  },
];

const Index = ({}) => {
  const home = useSelector((state) => state.home);
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
  const [formData, setFormData] = useState({
    canteen: {
      value: undefined,
      text: '请选择',
    },
    time: {
      value: undefined,
      text: '请选择',
    },
    date: tomorrow,
  });
  const dispatch = useDispatch();
  const { canteenList } = home;
  console.log(canteenList);
  useEffect(() => {
    asyncActions.getCanteenList(dispatch);
  }, [dispatch]);

  const { canteen, date, time } = formData;
  return (
    <View className={styles.index}>
      <View className={styles.content}>
        <View>就餐信息</View>
        <Picker
          mode="selector"
          rangeKey="name"
          range={canteenList}
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
            <AtListItem title="就餐食堂" extraText={canteen.text} />
          </AtList>
        </Picker>
        <Picker
          mode="date"
          value={date}
          start={tomorrow}
          end={dayjs().add(3, 'day').format('YYYY-MM-DD')}
          onChange={(e) => {
            const { value } = e.detail;
            setFormData({
              ...formData,
              date: value,
            });
          }}
        >
          <AtList>
            <AtListItem title="就餐日期" extraText={date} />
          </AtList>
        </Picker>
        <Picker
          mode="selector"
          rangeKey="text"
          range={timeData}
          onChange={(e) => {
            const { value } = e.detail;
            setFormData({
              ...formData,
              time: {
                value,
                text: timeData[value].text,
              },
            });
          }}
        >
          <AtList>
            <AtListItem title="就餐时间" extraText={time.text} />
          </AtList>
        </Picker>
        <AtButton
          onClick={(e) => {
            console.log(formData);
            const { canteen, time, date } = formData;
            if (!canteen.value || !time.value) {
              Taro.showToast({
                title: '请完善表单信息',
                icon: 'none',
              });
            } else {
              console.log(dayjs(`${date} 00:00:00`));
              console.log(dayjs(date));
              const data = {
                canteenId: canteen.value,
                canteenName: canteen.text,
                eatTime: time.value,
                eatDate: dayjs(date).valueOf(),
              };
              console.log(data);
              asyncActions.submitOrder(dispatch, data);
            }
          }}
        >
          提交
        </AtButton>
      </View>
      <Menu current={0} />
    </View>
  );
};

export default Index;
