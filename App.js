import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity,
  Text 
} from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const VideoCard = ({ video, onPause }) => {
  const [paused, setPaused] = useState(true);

  // Safely extract video source
  const videoSource = video?.video_files?.[0]?.link;

  return (
    <TouchableOpacity 
      style={styles.videoContainer} 
      onPress={() => {
        setPaused(!paused);
        onPause(paused);
      }}
    >
      {/* Ensure that videoSource is valid before rendering the Video component */}
      {videoSource ? (
        <Video
          source={{ uri: videoSource }}
          style={styles.video}
          resizeMode="cover"
          paused={paused}
          repeat
          onError={(error) => console.log('Video Error:', error)}
        />
      ) : (
        <Text style={styles.errorText}>Video unavailable</Text>
      )}
    </TouchableOpacity>
  );
};

const App = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/videos/popular', {
        headers: { 
          'Authorization': '5TKwGgTtQz2LlKAC9TKABTx4SC0PuFwdVf0wYHmTDBBz8jAOzUvBQEzU'  // Replace with your actual API key
        },
        params: { 
          per_page: 10, 
          page: currentPage 
        }
      });
      
      // Safely handle response
      const newVideos = response.data?.videos || [];
      setVideos(prev => [...prev, ...newVideos]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Video fetch error', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePause = (isPaused) => {
    // Additional pause logic if needed
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item }) => (
          <VideoCard 
            video={item} 
            onPause={handlePause} 
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={height}
        vertical
        onEndReached={fetchVideos}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  errorText: {
    color: 'red',
    fontSize: 18
  },
  videoContainer: {
    height: height,
    width: width
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default App;
