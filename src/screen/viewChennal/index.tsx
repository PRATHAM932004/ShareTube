import { Header, STIcon, STLoader } from '@components';
import { Color } from '@theme';
import {
  logout,
  moderateScale,
  numberToTime,
  searchAction,
  width,
} from '@utils';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import {
  ProfileStackProps,
  RootProfileParamList,
  RootStackParamList,
} from 'src/route/navTypes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { logoutRequest } from '@redux/action/authAction';
import { ApiResponseFront } from '@type/apiResponseType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserProfileDetails } from '@redux/action/userAction';
import { Divider } from 'react-native-paper';

const ViewChennal = ({ navigation }: ProfileStackProps<'VIEWCHENNAL'>) => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const nav1 = useNavigation<NativeStackNavigationProp<RootProfileParamList>>();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { isLoading, userProfile } = useSelector(
    (state: RootState) => state.userSlice
  );
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(
          getUserProfileDetails({
            body: { userName: user.userName },
            navigation,
          })
        );
      } else {
        logout(navigation);
      }
    }, [])
  );

  const openSelectedVideo = (item: { _id: string }) => {
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
      <Header
        isBack
        actuionMenus={[searchAction]}
        onMenuPress={async (item) => {
          if (item.id === 'Search') {
            nav.navigate('ALLVIDEO');
          }
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Color.backgroundPrimary,
          paddingTop: insets.top,
        }}
      >
        <View style={{ flexDirection: 'row', padding: moderateScale(16) }}>
          <Image
            source={{ uri: userProfile?.avatar }}
            height={moderateScale(120)}
            width={moderateScale(120)}
            style={{
              borderRadius: moderateScale(70),
              marginRight: moderateScale(16),
            }}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{ color: Color.textPrimary, fontSize: moderateScale(28) }}
            >
              {userProfile?.fullName}
            </Text>
            <Text
              style={{
                color: Color.textPrimary,
                fontSize: moderateScale(16),
              }}
            >
              @{userProfile?.userName}
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', paddingHorizontal: moderateScale(8) }}
        >
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: moderateScale(8),
              width: (width - moderateScale(16)) / 2 - 2 * moderateScale(8),
              borderWidth: 1,
              backgroundColor: Color.backgroundSecondary,
              alignItems: 'center',
              padding: moderateScale(16),
              borderRadius: moderateScale(16),
            }}
          >
            <Text
              style={{
                color: Color.textPrimary,
                fontSize: moderateScale(20),
              }}
            >
              {userProfile?.totalLikes}
            </Text>
            <Text
              style={{
                color: Color.textPrimary,
                fontSize: moderateScale(20),
              }}
            >
              Total Likes
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: moderateScale(8),
              width: (width - moderateScale(16)) / 2 - 2 * moderateScale(8),
              borderWidth: 1,
              backgroundColor: Color.backgroundSecondary,
              alignItems: 'center',
              padding: moderateScale(16),
              borderRadius: moderateScale(16),
            }}
          >
            <Text
              style={{
                color: Color.textPrimary,
                fontSize: moderateScale(20),
              }}
            >
              {userProfile?.subscribersCount}
            </Text>
            <Text
              style={{
                color: Color.textPrimary,
                fontSize: moderateScale(20),
              }}
            >
              Total Subscribers
            </Text>
          </View>
        </View>
        <View style={{ padding: moderateScale(16) }}>
          <TouchableOpacity
            // onPress={logoutAction}
            activeOpacity={0.7}
            style={{
              backgroundColor: Color.backgroundSecondary,
              alignItems: 'center',
              padding: moderateScale(16),
              borderRadius: moderateScale(30),
              flexDirection: 'row',
              justifyContent: 'center',
              gap: moderateScale(16),
            }}
          >
            <STIcon
              name="edit"
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
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            width: '95%',
            alignSelf: 'center',
            marginBottom: moderateScale(16),
          }}
        />
        {/* <View style={{ padding: moderateScale(16) }}>
          <Text
            style={{
              color: Color.textPrimary,
              fontSize: moderateScale(20),
              borderWidth: 1,
              borderColor: Color.textPrimary,
              borderRadius: moderateScale(32),
              padding: moderateScale(16),
              alignSelf: 'flex-start',
            }}
          >
            Videos
          </Text>
        </View> */}
        <FlatList
          data={userProfile?.uploadedVideos}
          renderItem={({ item, index }) => {
            const { _id, thumbnail, duration, title, views } = item;

            return (
              item && (
                <TouchableOpacity
                  key={index}
                  style={{ flex: 1, flexDirection: 'column' }}
                  onPress={() => openSelectedVideo(item)}
                  activeOpacity={0.7}
                >
                  <View style={{ position: 'relative' }}>
                    <Image
                      source={{ uri: thumbnail }}
                      height={moderateScale(400)}
                      width={width}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: moderateScale(16),
                        right: moderateScale(16),
                        color: Color.white,
                        fontSize: moderateScale(16),
                        fontWeight: 'bold',
                        backgroundColor: Color.backgroundPrimary,
                        paddingHorizontal: moderateScale(10),
                        paddingVertical: moderateScale(5),
                        borderRadius: moderateScale(5),
                      }}
                    >
                      {numberToTime(duration)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: moderateScale(16),
                    }}
                  >
                    <Image
                      source={{ uri: userProfile?.avatar }}
                      height={moderateScale(50)}
                      width={moderateScale(50)}
                      style={{
                        borderRadius: 25,
                        marginRight: moderateScale(16),
                      }}
                    />
                    <View>
                      <View>
                        <Text
                          style={{
                            fontSize: moderateScale(20),
                            color: Color.white,
                          }}
                          numberOfLines={2}
                        >
                          {title}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: moderateScale(16),
                            color: Color.white,
                          }}
                        >
                          {userProfile?.fullName} • {views} views
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 100 }} />}
          style={{ backgroundColor: Color.backgroundPrimary }}
        />
      </View>
      <STLoader visible={isLoading} />
    </>
  );
};

export default ViewChennal;
