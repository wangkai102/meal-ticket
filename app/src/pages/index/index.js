import React, { useEffect } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';

import * as asyncActions from '../../actions/home';
import styles from './index.module.less';

const Index = ({}) => {
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { num } = home;

  useEffect(() => {
    asyncActions.login(dispatch);
  }, []);

  return (
    <View className={styles.index}>
      <Button
        className={styles.addBtn}
        onClick={() =>
          dispatch({
            type: 'save',
            payload: {
              num: num + 1,
            },
          })
        }
      >
        +
      </Button>
      <Button
        className={styles.decBtn}
        onClick={() =>
          dispatch({
            type: 'save',
            payload: {
              num: num - 1,
            },
          })
        }
      >
        -
      </Button>
      <Button
        className={styles.decBtn}
        onClick={() => {
          const payload = { num: num + 1 };
          const { asyncAddBtn } = asyncActions;
          asyncAddBtn(dispatch, payload);
        }}
      >
        async
      </Button>
      <View>
        <Text>{num}</Text>
      </View>
      <View>
        <Text>Hello, World</Text>
      </View>
    </View>
  );
};

export default Index;
