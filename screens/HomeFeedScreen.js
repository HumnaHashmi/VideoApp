import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, StatusBar } from 'react-native';
import axios from 'axios';
import VideoCard from './VideoCard';

const { height } = Dimensions.get('window');

const HomeFeedScreen = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/videos/popular', {
        headers: { 
          'Authorization': 'YOUR_PEXELS_API_KEY'
        },
        params: { 
          per_page: 10, 
          page: currentPage 
        }
      });
      
      const newVideos = response.data?.videos || [];
      setVideos(prev => [...prev, ...newVideos]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Video fetch error', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar hidden />
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchVideos}
        onEndReachedThreshold={0.5}
        pagingEnabled
      />
    </View>
  );
};

export default HomeFeedScreen;