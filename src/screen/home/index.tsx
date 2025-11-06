import { RenderVideos, STLoader } from '@components';
import {
  addToWatchHistory,
  getAllVideosAction,
} from '@redux/action/videoAction';
import { AppDispatch, RootState } from '@redux/store';
import { Color } from '@theme';
import { VideoWithOwner } from '@type/dbModelType';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '@utils';

const Home = () => {
  const { isLoading, allVideos, totalRecord, totalPages } = useSelector(
    (state: RootState) => state.videoSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = () => {
    dispatch(getAllVideosAction({ body: { limit: 10, page: 1 }, navigation }));
  };

  const openSelectedVideo = (item: VideoWithOwner) => {
    navigation.push('PLAYVIDEO', { _id: item._id });
  };

  const onRefresh = () => {
    setRefresh(false);
    getAllVideos();
  };

  return (
    <>
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
        style={{ backgroundColor: Color.backgroundSecondary }}
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
