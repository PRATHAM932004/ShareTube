import {
  Modal,
  Text,
  View,
  ModalProps,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Strings } from '@theme';

export interface STModalProps extends ModalProps {
  closeDialog: () => void;
  visible: boolean;
  message: string | Promise<string>;
  isPositive?: boolean;
  isNagative?: boolean;
  positiveTitle?: string;
  nagativeTitle?: string;
  onPositiveBtnPress?: () => void;
  onNagativeBtnPress?: () => void;
  cStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
  positiveBtnStyle?: StyleProp<ViewStyle>;
  nagativeBtnStyle?: StyleProp<ViewStyle>;
  positiveTextStyle?: StyleProp<ViewStyle>;
  nagativeTextStyle?: StyleProp<ViewStyle>;
}

const { t } = useTranslation();

const STDialog = ({
  visible,
  cStyle,
  closeDialog,
  onPositiveBtnPress = closeDialog,
  onNagativeBtnPress,
  message,
  messageStyle,
  isPositive = true,
  isNagative = false,
  // positiveTitle = t('yes'),
  positiveTitle = Strings.yes,
  // nagativeTitle = t('no'),
  nagativeTitle = Strings.no,
  positiveBtnStyle,
  nagativeBtnStyle,
  positiveTextStyle,
  buttonContainer,
  nagativeTextStyle,
  ...rest
}: STModalProps) => {
  return (
    visible && (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={closeDialog}
        statusBarTranslucent
        {...rest}
      >
        <TouchableWithoutFeedback onPress={closeDialog}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalView, cStyle]}>
                <Text style={[styles.modalText, messageStyle]}>{message}</Text>
                <View style={styles.buttonGroup}>
                  {isNagative && (
                    <TouchableOpacity
                      onPress={closeDialog}
                      activeOpacity={0.75}
                      style={[styles.btnContainer, buttonContainer]}
                    >
                      <View style={[styles.nagativeBtn, nagativeBtnStyle]}>
                        <Text
                          style={[
                            styles.nagativeBtnTextStyle,
                            nagativeTextStyle,
                          ]}
                        >
                          {nagativeTitle}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  {isPositive && (
                    <TouchableOpacity
                      onPress={onPositiveBtnPress}
                      activeOpacity={0.75}
                      style={[styles.btnContainer, buttonContainer]}
                    >
                      <View style={[styles.positiveBtn, positiveBtnStyle]}>
                        <Text
                          style={[
                            styles.positiveBtnTextStyle,
                            positiveTextStyle,
                          ]}
                        >
                          {positiveTitle}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  );
};

export default STDialog;
