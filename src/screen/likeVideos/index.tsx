import { STLoader } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAllLikedVideo } from '@redux/action/likeAction';
import { AppDispatch, RootState } from '@redux/store';
import { Color } from '@theme';
import { VideoWithOwnerWithCurrentUserData } from '@type/dbModelType';
import { moderateScale, width } from '@utils';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MoreProps, RootStackParamList } from 'src/route/navTypes';

const LikedVideo = ({ navigation }: MoreProps<'LIKEDVIDEO'>) => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, likedVideos } = useSelector(
    (state: RootState) => state.likeSlice
  );

  useEffect(() => {
    dispatch(getAllLikedVideo({ navigation }));
  }, []);

  const openSelectedVideo = (item: VideoWithOwnerWithCurrentUserData) => {
    nav.push('PLAYVIDEO', { _id: item._id });
  };

  return (
    <>
      <View
        style={{
          padding: moderateScale(16),
          flex: 1,
          backgroundColor: Color.backgroundPrimary,
        }}
      >
        <FlatList
          data={likedVideos}
          renderItem={({ item, index }) => {
            const {
              owner: { fullName },
              thumbnail,
              title,
              views,
            } = item;
            return (
              <TouchableOpacity
                onPress={() => openSelectedVideo(item)}
                style={{
                  height: moderateScale(180),
                  marginBottom: moderateScale(16),
                  flexDirection: 'row',
                }}
              >
                <Image
                  source={{ uri: thumbnail }}
                  height={moderateScale(180)}
                  width={width * 0.45 - moderateScale(16)}
                  style={{ borderRadius: moderateScale(16) }}
                />
                <View
                  style={{
                    paddingHorizontal: moderateScale(20),
                    width: width * 0.55 - moderateScale(16),
                  }}
                >
                  <Text style={{ color: Color.textPrimary }}>{title}</Text>
                  <Text style={{ color: Color.textPrimary }}>{fullName}</Text>
                  <Text style={{ color: Color.textSecondary }}>
                    {views} Views
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>
      <STLoader visible={isLoading} />
    </>
  );
};

export default LikedVideo;
