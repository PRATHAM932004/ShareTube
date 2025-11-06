import { Color } from '@theme';
import { VideoWithOwner } from '@type/dbModelType';
import { moderateScale, numberToTime, width } from '@utils';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const RenderVideos = ({
  item,
  index,
  onVideoPress,
  currentVideo,
}: {
  item: VideoWithOwner;
  index: number;
  onVideoPress: (item: VideoWithOwner) => void;
  currentVideo?: { _id: string };
}) => {
  const {
    _id,
    thumbnail,
    duration,
    owner: { avatar, fullName },
    title,
    views,
  } = item;

  if (currentVideo && _id == currentVideo._id) {
    return null;
  }

  return (
    item && (
      <TouchableOpacity
        key={index}
        style={{ flex: 1, flexDirection: 'column' }}
        onPress={() => onVideoPress(item)}
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
            source={{ uri: avatar }}
            height={moderateScale(50)}
            width={moderateScale(50)}
            style={{ borderRadius: 25, marginRight: moderateScale(16) }}
          />
          <View>
            <View>
              <Text
                style={{ fontSize: moderateScale(20), color: Color.white }}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: moderateScale(16), color: Color.white }}>
                {fullName} • {views} views
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

export default RenderVideos;
