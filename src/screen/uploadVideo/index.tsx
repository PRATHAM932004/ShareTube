import React, { useCallback, useState } from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from 'src/route/navTypes';
import { Color, Images } from '@theme';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import { useFocusEffect } from '@react-navigation/native';
import { Header, STButton, STIcon, STLoader, STTextInput } from '@components';
import Video from 'react-native-video';
import { getToken, moderateScale, showToast, WebServices, width } from '@utils';
import { Controller, useForm } from 'react-hook-form';
import { uploadVideoSchema, UploadVideoSchemaType } from '@zSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppDispatch, RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '@redux/action/videoAction';
import { ApiResponseFront } from '@type/apiResponseType';
import RNFS from 'react-native-fs';
import axios from 'axios';

const UploadVideo = ({ navigation }: BottomTabScreenProps<'UPLOAD'>) => {
  const [video, setVideo] = useState<DocumentPickerResponse | undefined>(
    undefined
  );
  const [thumbnail, setThumbnail] = useState<DocumentPickerResponse | string>(
    Images.defaultThumbnail
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.videoSlice);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<UploadVideoSchemaType>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      thumbnail: '',
      videoFile: '',
    },
  });
  const watchedVideo = watch('videoFile');

  useFocusEffect(
    useCallback(() => {
      pickUpMedia('Video');

      return () => {
        reset();
        setVideo(undefined);
        setThumbnail(Images.defaultThumbnail);
      };
    }, [])
  );

  const pickUpMedia = async (mediaType: 'Image' | 'Video') => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);
    }

    const type = mediaType == 'Video' ? types.video : types.images;

    try {
      const res = await pick({
        allowMultiSelection: false,
        type: [type],
        mode: 'open',
      });

      const file = res[0];

      if (mediaType === 'Video') {
        setVideo(file);
        setValue('videoFile', file.uri, { shouldValidate: true });
      } else {
        setThumbnail(file);
        setValue('thumbnail', file.uri, { shouldValidate: true });
      }
    } catch (err: any) {
      if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
        console.log('User cancelled picker');
        if (mediaType === 'Video' && !watchedVideo) {
          navigation.goBack();
        }
      } else {
        console.error('Picker error:', err);
      }
    }
  };

  const onSubmit = async (data: UploadVideoSchemaType) => {
    if (!video || typeof thumbnail === 'string') {
      showToast('Video and Thumbnail is required');
      return;
    }

    // const copyFileToCache = async (
    //   uri: string,
    //   filename: string
    // ): Promise<string> => {
    //   const destPath = `${RNFS.CachesDirectoryPath}/${Date.now()}_${filename}`;
    //   await RNFS.copyFile(uri, destPath);
    //   return `file:/${destPath}`;
    // };

    // // 1. Copy files to cache
    // const videoPath = await copyFileToCache(video.uri, 'video.mp4');
    // const thumbPath = await copyFileToCache(thumbnail.uri, 'thumb.jpg');

    // 2. Build FormData
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('videoFile', {
      uri: video.uri,
      type: video.type,
      name: video.name,
    } as any);
    formData.append('thumbnail', {
      uri: thumbnail.uri,
      type: thumbnail.type,
      name: thumbnail.name,
    } as any);

    console.log(formData);
    const token = await getToken();

    // 5. CORRECT AXIOS USAGE
    const instance = axios.create();
    const response = await axios.post(
      `${WebServices.baseUrl}/api/v1/video`,
      formData,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          // DO NOT SET Content-Type
        },
        timeout: 300000, // 5 minutes
        transformRequest: [(data: any) => data],
      }
    );
    console.log('first', response);
  };

  const thumbnailSource =
    typeof thumbnail === 'string'
      ? thumbnail
      : thumbnail?.uri
      ? { uri: thumbnail.uri }
      : Images.defaultThumbnail;

  return (
    <>
      <Header isBack title="Add Details" />
      <View style={{ flex: 1, backgroundColor: Color.backgroundPrimary }}>
        {video && (
          <View>
            <View style={{ position: 'relative' }}>
              <Image
                source={thumbnailSource}
                style={{ height: moderateScale(350), width: width }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: moderateScale(16),
                  left: moderateScale(16),
                  backgroundColor: Color.backgroundPrimary,
                  paddingHorizontal: moderateScale(10),
                  paddingVertical: moderateScale(10),
                  borderRadius: moderateScale(30),
                  width: moderateScale(60),
                  height: moderateScale(60),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => pickUpMedia('Image')}
                activeOpacity={0.7}
              >
                <STIcon
                  name="edit"
                  type="MaterialIcons"
                  size={moderateScale(48)}
                  color={Color.textPrimary}
                />
              </TouchableOpacity>
            </View>
            <Video
              source={{ uri: video.uri }}
              controls={true}
              resizeMode="cover"
              paused={false}
              repeat={true}
              style={{ width: width, height: moderateScale(350) }}
            />
            <View style={{ padding: moderateScale(16) }}>
              <Controller
                control={control}
                name="title"
                render={({ field: { value, onBlur, onChange } }) => (
                  <STTextInput<UploadVideoSchemaType>
                    cStyle={{ width: '100%' }}
                    id="title"
                    label="Title"
                    placeholder="Enter title"
                    helperText={errors.title?.message}
                    error={!!errors.title}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onBlur, onChange } }) => (
                  <STTextInput<UploadVideoSchemaType>
                    cStyle={{ width: '100%', marginTop: moderateScale(12) }}
                    id="description"
                    label="Description"
                    helperText={errors.description?.message}
                    error={!!errors.description}
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
                  Upload
                </Text>
              </STButton>
            </View>
          </View>
        )}
      </View>
      <STLoader visible={isLoading} />
    </>
  );
};

export default UploadVideo;
