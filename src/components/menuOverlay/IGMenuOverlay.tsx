import {
  Modal,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ModalProps,
} from 'react-native';
import React from 'react';
import { ActionMenu } from '@type/common';
import { Color } from '@theme';
import { styles } from './style';
import { STIcon } from '@components';

interface STMenuOverlayProps extends ModalProps {
  visible: boolean;
  closeMenu: () => void;
  menus: ActionMenu[];
  onSelect: (item: ActionMenu) => void;
}

const STMenuOverlay = ({
  visible,
  closeMenu,
  menus,
  onSelect,
  ...rest
}: STMenuOverlayProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={closeMenu}
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={[styles.popupOverlay]}>
          <View style={[styles.popupMenu]}>
            <FlatList
              data={menus}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    closeMenu();
                    onSelect(item);
                  }}
                >
                  <STIcon {...item.icon} color={Color.black} size={20} />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default STMenuOverlay;
