import React, { useCallback, useState } from 'react';
import { PermissionsAndroid, Text, View, Platform } from 'react-native';
import { BottomTabScreenProps } from 'src/route/navTypes';
import { Color } from '@theme';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '@components';
import Video from 'react-native-video';
import { moderateScale, width } from '@utils';

const UploadVideo = ({ navigation }: BottomTabScreenProps<'UPLOAD'>) => {
  const [trimedVideo, setTrimedVideo] = useState<
    DocumentPickerResponse | undefined
  >(undefined);

  useFocusEffect(
    useCallback(() => {
      pickUpMedia();

      return () => {
        setTrimedVideo(undefined);
      };
    }, [])
  );

  const pickUpMedia = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);
    }

    try {
      const res = await pick({
        allowMultiSelection: false,
        type: [types.video],
        mode: 'open',
      });

      setTrimedVideo(res[0]);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'code' in err) {
        const error = err as { code?: string };
        if (error.code === 'DOCUMENT_PICKER_CANCELED') {
          console.log('User cancelled picker');
          return;
        }
      }
      console.error('Error picking file:', err);
    }
  };

  return (
    <>
      <Header isBack title="Add Details" />
      {trimedVideo && (
        <View style={{ flex: 1, backgroundColor: Color.backgroundPrimary }}>
          <Video
            source={{ uri: trimedVideo.uri }}
            controls={true}
            resizeMode="cover"
            paused={false}
            repeat={true}
            style={{ width: width, height: moderateScale(360) }}
          />
          <Text style={{ color: Color.textPrimary }}>
            {trimedVideo?.uri ?? ''}
          </Text>
        </View>
      )}
    </>
  );
};

export default UploadVideo;
