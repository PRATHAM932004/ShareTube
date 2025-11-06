import { View, Text, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { Color, Images, Strings } from '@theme';
import { StackProps } from 'src/route/navTypes';
import { AppDispatch, RootState } from '@redux/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAsyncValue,
  getUser,
  moderateScale,
  setAsyncValue,
  TF_VALUE,
} from '@utils';
import { ApiResponseFront } from '@type/apiResponseType';
import { setUser } from '@redux/reducers/authSlice';
import { User } from '@type/dbModelType';

const Splash = ({ navigation }: StackProps<'SPLASH'>) => {
  const insets = useSafeAreaInsets();
  // const dispatch = useDispatch<AppDispatch>();

  // const [saBottom, setSABottom] = useState(0);
  // const {
  //   currentWorkOpTimeline,
  //   currentStoppageOpTimeline,
  //   currentMachineCardTimeline,
  //   currentMachineCardSetupTimeline,
  // } = useSelector((state: RootState) => state.workProcessSlice);

  // useEffect(() => {
  //   setSABottom(insets.bottom);
  // }, [insets]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    redirectToNext();
  }, []);

  const redirectToNext = async () => {
    const isLogin: string | null = await getAsyncValue('isLogin');
    const userData: User | undefined = await getUser();
    if (isLogin == TF_VALUE.TRUE && userData) {
      dispatch(setUser(userData));
      navigation.reset({
        index: 0,
        routes: [{ name: 'DASHBOARD' }],
      });
    } else {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LOGIN' }],
        });
      }, 2000);
    }
  };

  // const initializeAppAPI = async (userData: string) => {
  //   const { roleId } = JSON.parse(userData);
  //   const { success, data } = (
  //     await dispatch(
  //       initializeAppAction({
  //         body: { id: roleId },
  //         navigation,
  //       })
  //     )
  //   ).payload as ApiResponseFront<InitializeAppType>;
  //   if (success && data) {
  //     const { menus, ...userData } = data;
  //     const machine: string | null = await getAsyncValue('machine');
  //     setAsyncValue('userData', JSON.stringify(userData));
  //     setAsyncValue('menus', JSON.stringify(menus));
  //     const operator: string | null = await getAsyncValue('operator');
  //     const shift: string | null = await getAsyncValue('shift');

  //     if (operator && shift) {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'WorkProcess' }],
  //       });
  //     } else {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: machine ? 'HOME' : 'SelectMachine' }],
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: Color.accent, fontSize: moderateScale(70) }}>
          ShareTube
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: insets.bottom,
        }}
      >
        <ActivityIndicator size={'large'} color={Color.white} />
      </View>
    </>
  );
};

export default Splash;
