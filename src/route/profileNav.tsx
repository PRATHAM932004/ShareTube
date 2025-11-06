import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootProfileParamList } from './navTypes';
import Screen from '@screen';
import { Color } from '@theme';

const ProfileNavigator = () => {
  const ProfileStack = createNativeStackNavigator<RootProfileParamList>();
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="PROFILEMAIN" component={Screen.Profile} />
      <ProfileStack.Screen
        name="LIKEDVIDEO"
        component={Screen.LikedVideo}
        options={{
          headerShown: true,
          title: 'Liked Videos',
          headerStyle: { backgroundColor: Color.backgroundPrimary },
          headerTintColor: Color.textPrimary,
        }}
      />
      <ProfileStack.Screen
        name="VIEWHISTORY"
        component={Screen.ViewHistory}
        options={{
          headerShown: true,
          title: 'History',
          headerStyle: { backgroundColor: Color.backgroundPrimary },
          headerTintColor: Color.textPrimary,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
