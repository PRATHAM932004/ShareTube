import { STIcon, STLoader } from '@components';
import { Color } from '@theme';
import { logout, moderateScale, numberToTime } from '@utils';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import {
  BottomMainProps,
  ProfileStackProps,
  RootProfileParamList,
  RootStackParamList,
} from 'src/route/navTypes';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { logoutRequest } from '@redux/action/authAction';
import {
  ApiResponseFront,
  GetViewWatchHistoryApiResponse,
} from '@type/apiResponseType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { viewWatchHistory } from '@redux/action/videoAction';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = ({ navigation }: ProfileStackProps<'PROFILEMAIN'>) => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const nav1 = useNavigation<NativeStackNavigationProp<RootProfileParamList>>();
  const { isLoading, user } = useSelector(
    (state: RootState) => state.authSlice
  );
  const { isLoading: watchHistoryLoading, watchHistory } = useSelector(
    (state: RootState) => state.videoSlice
  );
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(viewWatchHistory({ navigation }));
  }, []);

  const openSelectedVideo = (item: GetViewWatchHistoryApiResponse) => {
    nav.push('PLAYVIDEO', { _id: item._id });
  };

  const logoutAction = async () => {
    const { success } = (await dispatch(logoutRequest({ navigation })))
      .payload as ApiResponseFront;
    if (success) {
      logout(navigation);
    }
  };

  const likedVideoAction = async () => {
    nav1.push('LIKEDVIDEO');
  };

  const viewHistoryAction = async () => {
    nav1.push('VIEWHISTORY');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.backgroundSecondary,
          bottom: insets.bottom,
          top: insets.top,
        }}
      >
        <View style={{ flexDirection: 'row', padding: moderateScale(16) }}>
          <Image
            source={{ uri: user?.avatar }}
            height={80}
            width={80}
            style={{ borderRadius: 40, marginRight: moderateScale(16) }}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{ color: Color.textPrimary, fontSize: moderateScale(28) }}
            >
              {user?.fullName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: Color.textPrimary,
                  fontSize: moderateScale(16),
                }}
              >
                @{user?.userName} •
              </Text>
              <Text
                style={{
                  color: Color.textSecondary,
                  fontSize: moderateScale(16),
                }}
              >
                {' View Channel >'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: moderateScale(16) }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: moderateScale(16),
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(24),
                color: Color.textPrimary,
              }}
            >
              History
            </Text>
            <TouchableOpacity onPress={viewHistoryAction} activeOpacity={0.7}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  padding: moderateScale(12),
                  borderWidth: moderateScale(1),
                  borderRadius: moderateScale(32),
                  borderColor: Color.textPrimary,
                  color: Color.textPrimary,
                }}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={watchHistory}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => openSelectedVideo(item)}
                activeOpacity={0.7}
                style={{ backgroundColor: Color.backgroundSecondary }}
              >
                <View>
                  <Image
                    source={{ uri: item.thumbnail }}
                    height={moderateScale(150)}
                    width={moderateScale(230)}
                    style={{
                      borderRadius: moderateScale(10),
                      marginRight: moderateScale(16),
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: moderateScale(4),
                      right: moderateScale(20),
                      color: Color.textPrimary,
                      fontSize: moderateScale(12),
                      fontWeight: 'bold',
                      backgroundColor: Color.black_50,
                      paddingHorizontal: moderateScale(10),
                      paddingVertical: moderateScale(5),
                      borderRadius: moderateScale(5),
                    }}
                  >
                    {numberToTime(item.duration)}
                  </Text>
                </View>
                <Text
                  style={{
                    width: moderateScale(230),
                    fontSize: moderateScale(20),
                    color: Color.textPrimary,
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    width: moderateScale(230),
                    fontSize: moderateScale(16),
                    color: Color.textSecondary,
                  }}
                  numberOfLines={2}
                >
                  {item.owner.fullName}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            style={{ backgroundColor: Color.backgroundSecondary }}
          />
        </View>
        <TouchableOpacity
          onPress={likedVideoAction}
          activeOpacity={0.7}
          style={{
            height: moderateScale(80),
            backgroundColor: Color.backgroundTertiary,
            alignItems: 'center',
            padding: moderateScale(20),
            marginVertical: moderateScale(16),
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(30),
            flexDirection: 'row',
            gap: moderateScale(16),
          }}
        >
          <STIcon name="heart" type="Entypo" color={Color.textPrimary} />
          <Text
            style={{
              color: Color.textPrimary,
              fontWeight: 'bold',
              fontSize: moderateScale(20),
            }}
          >
            Liked Videos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logoutAction}
          activeOpacity={0.7}
          style={{
            height: moderateScale(80),
            backgroundColor: Color.backgroundTertiary,
            alignItems: 'center',
            padding: moderateScale(20),
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(30),
            flexDirection: 'row',
            gap: moderateScale(16),
          }}
        >
          <STIcon
            name="logout"
            type="MaterialIcons"
            color={Color.textPrimary}
          />
          <Text
            style={{
              color: Color.textPrimary,
              fontWeight: 'bold',
              fontSize: moderateScale(20),
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <STLoader visible={isLoading || watchHistoryLoading} />
    </>
  );
};

export default Profile;
