import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const YouTubePlayer = ({videoId}: {videoId: string}) => {
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View>
      <WebView source={{uri: youtubeUrl}} style={{width: 300}} />
    </View>
  );
};

export default YouTubePlayer;
