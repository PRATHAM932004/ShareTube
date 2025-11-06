import {
  View,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { height, icons, moderateScale } from '@utils';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { STIcon } from '@components';

export interface STBottomSheetProps {
  visible: boolean;
  closeIcon?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const STBottomSheet = ({
  visible,
  onClose,
  closeIcon = false,
  children,
}: STBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height + moderateScale(20));
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleBackdropPress = () => {
    onClose();
  };

  const closeIconView = () => {
    return closeIcon ? (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={handleBackdropPress}
        style={{
          padding: moderateScale(16),
          position: 'absolute',
          top: 0,
          end: 0,
        }}
      >
        <STIcon {...icons.close} />
      </TouchableOpacity>
    ) : null;
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY: slideAnim }],
            paddingBottom: insets.bottom,
            bottom: keyboardHeight,
          },
        ]}
      >
        {children}
        {closeIconView()}
      </Animated.View>
    </Modal>
  );
};

export default STBottomSheet;
