import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { Color } from '@theme';
import { loginSchema, LoginSchemaType } from '@zSchema';
import { icons, moderateScale, setAsyncValue, TF_VALUE } from '@utils';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from 'react-native-paper';
import { StackProps } from 'src/route/navTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { ApiResponseFront, LoginApiResponse } from '@type/apiResponseType';
import { loginRequest } from '@redux/action/authAction';
import { STButton, STLoader, STTextInput } from '@components';

const Login = ({ navigation }: StackProps<'LOGIN'>) => {
  const { isLoading } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const onSubmit = async (body: LoginSchemaType) => {
    const { success, data, message } = (
      await dispatch(loginRequest({ body, navigation }))
    ).payload as ApiResponseFront<LoginApiResponse>;
    if (success && data) {
      await setAsyncValue('accessToken', data.accessToken);
      await setAsyncValue('refreshToken', data.refreshToken);
      initializeAppAPI(data);
    }
  };

  const initializeAppAPI = async (loginData: LoginApiResponse) => {
    const { user } = loginData;

    if (user) {
      setAsyncValue('userData', JSON.stringify(user));
      setAsyncValue('isLogin', TF_VALUE.TRUE);
      navigation.reset({
        index: 0,
        routes: [{ name: 'DASHBOARD' }],
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '90%' }}>
            <Text
              style={{
                color: Color.accent,
                fontWeight: 'bold',
                marginBottom: moderateScale(40),
              }}
              variant="displaySmall"
            >
              Welcome
            </Text>
            <Controller
              control={control}
              name="usernameOrEmail"
              render={({ field: { value, onBlur, onChange } }) => (
                <STTextInput<LoginSchemaType>
                  cStyle={{ width: '100%' }}
                  id="usernameOrEmail"
                  label="Username/Email"
                  placeholder="Enter email"
                  leftIcon={icons.user}
                  helperText={errors.usernameOrEmail?.message}
                  error={!!errors.usernameOrEmail}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onBlur, onChange } }) => (
                <STTextInput<LoginSchemaType>
                  cStyle={{ width: '100%', marginTop: moderateScale(12) }}
                  id="password"
                  label="Password"
                  leftIcon={icons.password}
                  helperText={errors.password?.message}
                  error={!!errors.password}
                  passRightIcon
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <STButton
              cStyle={{
                marginTop: moderateScale(24),
                height: moderateScale(60),
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{
                  color: Color.white,
                  backgroundColor: Color.accent,
                  fontWeight: 'bold',
                }}
              >
                Login
              </Text>
            </STButton>
          </View>
        </View>
      </View>
      <STLoader visible={isLoading} />
    </>
  );
};

export default Login;
