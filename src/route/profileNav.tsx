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
      <ProfileStack.Screen name="LIKEDVIDEO" component={Screen.LikedVideo} />
      <ProfileStack.Screen name="VIEWHISTORY" component={Screen.ViewHistory} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
