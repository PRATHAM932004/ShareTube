import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color } from '@theme';
import { ActionMenu } from '@type/common';
import { styles } from './styles';
import IgMenuOverlay from '../menuOverlay/IGMenuOverlay';
import { moderateScale, moreAction } from '@utils';
import { STIcon } from '@components';

interface ActionMenuViewProps {
  actuionMenus?: ActionMenu[];
  onMenuPress: (item: ActionMenu) => void;
}

const ActionMenuView = ({
  actuionMenus = [],
  onMenuPress,
}: ActionMenuViewProps) => {
  const [activeMenus, setActiveMenus] = useState<ActionMenu[]>(
    actuionMenus?.filter((m) => m.isPrimary !== false)
  );
  const [inActiveMenus, setInActiveMenus] = useState<ActionMenu[]>(
    actuionMenus?.filter((m) => m.isPrimary === false)
  );
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (inActiveMenus && inActiveMenus.length > 0) {
      setActiveMenus([...activeMenus, moreAction]);
    }
  }, [inActiveMenus]);

  const renderItem = ({ item, index }: { item: ActionMenu; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        disabled={item.isNotPress}
        onPress={() => {
          if (item.id === 'More') {
            setMenuVisible(true);
          } else {
            onMenuPress(item);
          }
        }}
        style={[styles.menuItem]}
      >
        <View
          {...(item.isPrimaryWithLabel === true ? styles.iconWithTitle : {})}
        >
          <STIcon {...item.icon} color={Color.white} size={moderateScale(40)} />
          {item.isPrimaryWithLabel && (
            <Text style={styles.headerText}>{item.name}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return actuionMenus.length > 0 ? (
    <View>
      <FlatList
        data={activeMenus}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.grid}
        renderItem={renderItem}
      />
      <IgMenuOverlay
        visible={menuVisible}
        closeMenu={() => setMenuVisible(false)}
        menus={inActiveMenus}
        onSelect={(item) => {
          setMenuVisible(false);
          onMenuPress(item);
        }}
      />
    </View>
  ) : null;
};

export default ActionMenuView;
