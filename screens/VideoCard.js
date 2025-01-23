// components/VideoCard.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator 
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const VideoCard = ({ video }) => {
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);

  const videoSource = video?.video_files?.[0]?.link;

  return (
    <View style={styles.videoContainer}>
      {videoSource ? (
        <>
          <Video
            source={{ uri: videoSource }}
            style={styles.video}
            resizeMode="cover"
            paused={paused}
            repeat
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={(error) => console.log('Video Error:', error)}
          />
          {loading && (
            <ActivityIndicator 
              size="large" 
              color="#fff" 
              style={styles.loader} 
            />
          )}
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setPaused(!paused)}
          >
            <View style={styles.playPauseButton}>
              <Ionicons 
                name={paused ? 'play' : 'pause'} 
                size={32} 
                color="black" 
              />
            </View>
            <View style={styles.videoDetails}>
              <Text style={styles.username}>@{video.user?.name}</Text>
              <Text style={styles.caption}>{video.url}</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>Video unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 10,
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDetails: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }]
  },
  errorText: {
    color: 'red',
    fontSize: 18
  }
});

export default VideoCard;