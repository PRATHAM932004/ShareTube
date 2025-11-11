import { Header, RenderVideos, STLoader } from '@components';
import { getAllVideosAction } from '@redux/action/videoAction';
import { AppDispatch, RootState } from '@redux/store';
import { Color } from '@theme';
import { VideoWithOwner } from '@type/dbModelType';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BottomMainProps, RootStackParamList } from 'src/route/navTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { moderateScale, searchAction } from '@utils';

const Home = ({ navigation }: BottomMainProps<'HOME'>) => {
  const { isLoading, allVideos, totalRecord, totalPages } = useSelector(
    (state: RootState) => state.videoSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = () => {
    dispatch(getAllVideosAction({ body: { limit: 10, page: 1 }, navigation }));
  };

  const openSelectedVideo = (item: VideoWithOwner) => {
    nav.push('PLAYVIDEO', { _id: item._id });
  };

  const onRefresh = () => {
    setRefresh(false);
    getAllVideos();
  };

  return (
    <>
      <Header
        isLogo
        subContainerStyle={{ height: moderateScale(120) }}
        actuionMenus={[searchAction]}
        onMenuPress={async (item) => {
          if (item.id === 'Search') {
            nav.navigate('ALLVIDEO');
          }
        }}
      />
      <FlatList
        data={allVideos}
        renderItem={({ item, index }) => (
          <RenderVideos
            item={item}
            index={index}
            onVideoPress={openSelectedVideo}
          />
        )}
        numColumns={1}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
        style={{ backgroundColor: Color.backgroundPrimary }}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => onRefresh()}
            colors={[Color.accent]}
          />
        }
      />
      <STLoader visible={isLoading} />
    </>
  );
};

export default Home;
