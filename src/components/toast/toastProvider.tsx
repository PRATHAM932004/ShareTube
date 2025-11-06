import React from 'react';
import { ColorValue, Image, Text, View } from 'react-native';
import { styles } from './styles';
import { Color, Images } from '@theme';
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { ToastHideType } from '@type/common';
import { STIcon } from '@components';

interface MainToastProps {}
interface DashProps extends ToastShowParams {
  background: ColorValue;
}

const DEFAULT_MSG_NO_OF_LINE = 10;

const ToastProvider = (props: MainToastProps) => {
  const toastConfig = {
    successToast: (props: ToastShowParams) => successToast(props),
    errorToast: (props: ToastShowParams) => errorToast(props),
    warningToast: (props: ToastShowParams) => warningToast(props),
  };

  const successToast = (props: ToastShowParams) => {
    return (
      <View style={[styles.container, styles.successContainer]}>
        <View style={styles.subContainer}>
          <STIcon
            name="check-circle"
            type="MaterialCommunityIcons"
            color={Color.successToast}
          />
          <Text
            numberOfLines={DEFAULT_MSG_NO_OF_LINE}
            style={[styles.text, styles.successText]}
          >
            {props.text1}
          </Text>
        </View>
        <DashView {...props} background={Color.successToast} />
      </View>
    );
  };

  const errorToast = (props: ToastShowParams) => {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <View style={styles.subContainer}>
          <STIcon
            name="close-circle"
            type="MaterialCommunityIcons"
            color={Color.errorToast}
          />
          <Text
            // numberOfLines={DEFAULT_MSG_NO_OF_LINE}
            style={[styles.text, styles.errorText]}
          >
            {props.text1}
          </Text>
        </View>
        <DashView {...props} background={Color.errorToast} />
      </View>
    );
  };

  const warningToast = (props: ToastShowParams) => {
    return (
      <View style={[styles.container, styles.warningContainer]}>
        <View style={styles.subContainer}>
          <STIcon name="warning" type="Entypo" color={Color.warnToast} />
          <Text
            numberOfLines={DEFAULT_MSG_NO_OF_LINE}
            style={[styles.text, styles.warningText]}
          >
            {props.text1}
          </Text>
        </View>
        <DashView {...props} background={Color.warnToast} />
      </View>
    );
  };

  const DashView = (props: DashProps) => {
    const autoHide: ToastHideType = props.props.autoHide;
    return (
      <>
        {autoHide == 'NotHide' ? (
          <View
            style={[
              {
                backgroundColor: props.background,
              },
              styles.dashView,
            ]}
          />
        ) : (
          <View style={styles.hideDashView} />
        )}
      </>
    );
  };

  return <Toast config={toastConfig} />;
};
export default ToastProvider;
