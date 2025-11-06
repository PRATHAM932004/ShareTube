import {
  FlatList,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackProps } from 'src/route/navTypes';
import Video from 'react-native-video';
import { customTimeAgo, moderateScale, showToast, width } from '@utils';
import { Color } from '@theme';
import moment from 'moment';
import {
  RenderVideos,
  STBottomSheet,
  STButton,
  STIcon,
  STLoader,
} from '@components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { VideoWithOwner } from '@type/dbModelType';
import {
  addToWatchHistory,
  getAllVideosAction,
  getVideoByIdAction,
} from '@redux/action/videoAction';
import { likeToggleAction } from '@redux/action/likeAction';
import { ApiResponseFront } from '@type/apiResponseType';
import { subscriptionToggleAction } from '@redux/action/subscriptionAction';
import { clearVideoState } from '@redux/reducers/videoSlice';

const PlayVideo = ({ navigation, route }: StackProps<'PLAYVIDEO'>) => {
  const video = route.params;
  const { selectedVideo, allVideos } = useSelector(
    (state: RootState) => state.videoSlice
  );
  const [bottomShit, setBottomShit] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCounts, setLikesCounts] = useState<number>(0);
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const [subscribeCounts, setSubscribeCounts] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getVideo();
    return () => {
      dispatch(clearVideoState('selectedVideo'));
    };
  }, [route.params]);

  const getVideo = async () => {
    if (!allVideos) {
      const { success } = (
        await dispatch(
          getAllVideosAction({ body: { limit: 10, page: 1 }, navigation })
        )
      ).payload as ApiResponseFront;
      if (success) {
        const { success: videoGet } = (
          await dispatch(
            getVideoByIdAction({ body: { videoId: video._id }, navigation })
          )
        ).payload as ApiResponseFront;
        if (videoGet) {
          dispatch(
            addToWatchHistory({ body: { videoId: video._id }, navigation })
          );
          return true;
        } else {
          return false;
        }
      }
    } else {
      const { success: videoGet } = (
        await dispatch(
          getVideoByIdAction({ body: { videoId: video._id }, navigation })
        )
      ).payload as ApiResponseFront;
      if (videoGet) {
        dispatch(
          addToWatchHistory({ body: { videoId: video._id }, navigation })
        );
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      setLiked(selectedVideo.isLiked);
      setLikesCounts(selectedVideo.likesCount);
      setSubscribe(selectedVideo.isSubscribed);
      setSubscribeCounts(selectedVideo.subscribersCount);
    }
  }, [selectedVideo, allVideos]);

  const openSelectedVideo = async (item: VideoWithOwner) => {
    const res = await getVideo();
    if (res == true) {
      dispatch(addToWatchHistory({ body: { videoId: item._id }, navigation }));
      navigation.replace('PLAYVIDEO', item);
    }
  };

  const onMoreClick = () => {
    setBottomShit(true);
  };

  const toggleLike = async () => {
    const newLikedState = !liked;
    const diff = newLikedState ? 1 : -1;

    setLiked(newLikedState);
    setLikesCounts((prev) => (prev ?? 0) + diff);

    const { success } = (
      await dispatch(
        likeToggleAction({ body: { videoId: video._id }, navigation })
      )
    ).payload as ApiResponseFront;

    if (!success) {
      setLiked(!newLikedState);
      setLikesCounts((prev) => (prev ?? 0) - diff);
    }
  };

  const toggleSubscribe = async () => {
    const newSubscribeState = !subscribe;
    const diff = newSubscribeState ? 1 : -1;

    setSubscribe(newSubscribeState);
    setSubscribeCounts((prev) => (prev ?? 0) + diff);

    const { success } = (
      await dispatch(
        subscriptionToggleAction({
          body: { channelId: selectedVideo!.owner._id },
          navigation,
        })
      )
    ).payload as ApiResponseFront;

    if (!success) {
      setSubscribe(!newSubscribeState);
      setSubscribeCounts((prev) => (prev ?? 0) - diff);
    }
  };

  const shareBtnPress = async () => {
    await Share.share({
      message: `Check this out: https://sharetube-063s.onrender.com/video/${selectedVideo?._id}`,
    });
  };

  const handleBottomShitClose = () => {
    setBottomShit(false);
  };

  if (!selectedVideo) {
    return <STLoader visible={true} />;
  }
  const {
    description,
    owner: { avatar, fullName },
    title,
    videoFile,
    views,
    createdAt,
    likesCount,
    subscribersCount,
    isSubscribed,
  } = selectedVideo;

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Color.backgroundPrimary }}>
        <Video
          source={{ uri: videoFile }}
          controls={true}
          resizeMode="cover"
          paused={false}
          repeat={true}
          style={{ width: width, height: moderateScale(400) }}
        />
        <TouchableOpacity
          style={{ padding: moderateScale(20) }}
          onPress={onMoreClick}
          activeOpacity={1}
        >
          <View>
            <Text
              style={{
                fontSize: moderateScale(24),
                color: Color.textPrimary,
                marginBottom: moderateScale(8),
              }}
            >
              {title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                color: Color.textSecondary,
              }}
            >
              {`${views} views   ${customTimeAgo(createdAt)} `}
            </Text>
            <Text
              style={{ fontSize: moderateScale(20), color: Color.textPrimary }}
            >
              {`  ...more`}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(20),
          }}
        >
          <Image
            source={{ uri: avatar }}
            height={50}
            width={50}
            style={{ borderRadius: 25, marginRight: moderateScale(16) }}
          />
          <View style={{ flex: 1, justifyContent: 'center', height: 50 }}>
            <View>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  color: Color.textPrimary,
                }}
              >
                {fullName}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  color: Color.textPrimary,
                }}
              >
                {subscribeCounts} subscribers
              </Text>
            </View>
          </View>
          <STButton
            cStyle={{
              backgroundColor: subscribe ? Color.textPrimary : Color.red,
            }}
            onPress={toggleSubscribe}
          >
            <Text
              style={{
                lineHeight: moderateScale(20),
                color: !subscribe ? Color.textPrimary : Color.black,
                fontWeight: 'bold',
              }}
            >
              {subscribe ? 'Unsubscribe' : 'Subscribe'}
            </Text>
          </STButton>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(10),
            marginBottom: moderateScale(20),
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={toggleLike}
            activeOpacity={0.75}
            style={{
              flexDirection: 'row',
              marginHorizontal: moderateScale(10),
              width: (width - moderateScale(20) - 6 * moderateScale(10)) / 3,
              borderWidth: 1,
              backgroundColor: Color.backgroundSecondary,
              alignItems: 'center',
              padding: moderateScale(16),
              borderRadius: moderateScale(42),
              justifyContent: 'center',
            }}
          >
            <STIcon
              name={liked ? 'heart' : 'heart-outlined'}
              type="Entypo"
              color={Color.textPrimary}
            />
            <Text
              style={{ color: Color.textPrimary, marginLeft: moderateScale(8) }}
            >
              {likesCounts} Likes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.75}
            style={{
              flexDirection: 'row',
              marginHorizontal: moderateScale(10),
              width: (width - moderateScale(20) - 6 * moderateScale(10)) / 3,
              borderWidth: 1,
              backgroundColor: Color.backgroundSecondary,
              alignItems: 'center',
              padding: moderateScale(16),
              borderRadius: moderateScale(42),
              justifyContent: 'center',
            }}
          >
            <STIcon
              name="comment"
              type="FontAwesome"
              color={Color.textPrimary}
            />
            <Text
              style={{ color: Color.textPrimary, marginLeft: moderateScale(8) }}
            >
              Comment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareBtnPress}
            activeOpacity={0.75}
            style={{
              flexDirection: 'row',
              marginHorizontal: moderateScale(10),
              width: (width - moderateScale(20) - 6 * moderateScale(10)) / 3,
              borderWidth: 1,
              backgroundColor: Color.backgroundSecondary,
              alignItems: 'center',
              padding: moderateScale(16),
              borderRadius: moderateScale(42),
              justifyContent: 'center',
            }}
          >
            <STIcon name="share" type="FontAwesome" color={Color.textPrimary} />
            <Text
              style={{ color: Color.textPrimary, marginLeft: moderateScale(8) }}
            >
              Share
            </Text>
          </TouchableOpacity>
          <View></View>
        </View>
        <FlatList
          data={allVideos}
          renderItem={({ item, index }) => (
            <RenderVideos
              item={item}
              index={index}
              onVideoPress={openSelectedVideo}
              currentVideo={video}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item._id}
          style={{
            backgroundColor: Color.backgroundSecondary,
          }}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>
      <STBottomSheet visible={bottomShit} onClose={handleBottomShitClose}>
        <View
          style={{
            padding: moderateScale(8),
          }}
        >
          <View
            style={{
              marginBottom: moderateScale(16),
              padding: moderateScale(8),
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(24),
                color: Color.textPrimary,
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', marginBottom: moderateScale(16) }}
          >
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: moderateScale(8),
                width: width / 3 - 4 * moderateScale(8),
                borderWidth: 1,
                backgroundColor: Color.backgroundSecondary,
                alignItems: 'center',
                padding: moderateScale(8),
                borderRadius: moderateScale(12),
              }}
            >
              <Text style={{ color: Color.textPrimary }}>{likesCount}</Text>
              <Text style={{ color: Color.textPrimary }}>Likes</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: moderateScale(8),
                width: width / 3 - 4 * moderateScale(8),
                borderWidth: 1,
                backgroundColor: Color.backgroundSecondary,
                alignItems: 'center',
                padding: moderateScale(8),
                borderRadius: moderateScale(12),
              }}
            >
              <Text style={{ color: Color.textPrimary }}>{views}</Text>
              <Text style={{ color: Color.textPrimary }}>Views</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: moderateScale(8),
                width: width / 3 - 4 * moderateScale(8),
                borderWidth: 1,
                backgroundColor: Color.backgroundSecondary,
                alignItems: 'center',
                padding: moderateScale(8),
                borderRadius: moderateScale(12),
              }}
            >
              <Text style={{ color: Color.textPrimary }}>
                {moment(createdAt).format('D MMM')}
              </Text>
              <Text style={{ color: Color.textPrimary }}>
                {moment(createdAt).format('YYYY')}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: moderateScale(8),
              borderWidth: 1,
              backgroundColor: Color.backgroundSecondary,
              padding: moderateScale(16),
              borderRadius: moderateScale(12),
              minHeight: moderateScale(100),
              marginBottom: moderateScale(16),
            }}
          >
            <Text style={{ color: Color.textPrimary }}>{description}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: moderateScale(8),
            }}
          >
            <Image
              source={{ uri: avatar }}
              height={50}
              width={50}
              style={{ borderRadius: 25, marginRight: moderateScale(16) }}
            />
            <View style={{ flex: 1, justifyContent: 'center', height: 50 }}>
              <View>
                <Text
                  style={{
                    fontSize: moderateScale(20),
                    color: Color.textPrimary,
                  }}
                >
                  {fullName}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(20),
                    color: Color.textPrimary,
                  }}
                >
                  {subscribersCount} subscribers
                </Text>
              </View>
            </View>
            <STButton
              cStyle={{
                backgroundColor: subscribe ? Color.textPrimary : Color.red,
              }}
              onPress={toggleSubscribe}
            >
              <Text
                style={{
                  lineHeight: moderateScale(20),
                  color: !subscribe ? Color.textPrimary : Color.black,
                  fontWeight: 'bold',
                }}
              >
                {subscribe ? 'Unsubscribe' : 'Subscribe'}
              </Text>
            </STButton>
          </View>
        </View>
      </STBottomSheet>
    </>
  );
};

export default PlayVideo;
