import { Header, RenderVideos, STLoader } from '@components';
import { getAllVideosFilteredAction } from '@redux/action/videoAction';
import { AppDispatch, RootState } from '@redux/store';
import { Color } from '@theme';
import { VideoWithOwner } from '@type/dbModelType';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList, StackProps } from 'src/route/navTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { clearVideoState } from '@redux/reducers/videoSlice';

const AllVideo = ({ navigation }: StackProps<'ALLVIDEO'>) => {
  const {
    isLoading,
    allVideosFiltered,
    limitFiltered,
    pageFiltered,
    totalPagesFiltered,
    totalRecordFiltered,
  } = useSelector((state: RootState) => state.videoSlice);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      dispatch(clearVideoState('allVideosFiltered'));
    }, [])
  );

  const getAllVideos = (query: string) => {
    dispatch(
      getAllVideosFilteredAction({
        body: { limit: 10, page: 1, query },
        navigation,
      })
    );
  };

  const openSelectedVideo = (item: VideoWithOwner) => {
    nav.push('PLAYVIDEO', { _id: item._id });
  };

  const handleSubmit = async (value: string) => {
    getAllVideos(value);
  };

  return (
    <>
      <Header isBack isSearch onSubmit={handleSubmit} />
      <FlatList
        data={allVideosFiltered}
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
      />
      <STLoader visible={isLoading} />
    </>
  );
};

export default AllVideo;
