import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useGetMovieOrSerie} from '../hooks/movieSerie';
import {useGetMovieTrailler} from '../hooks/movies';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MovieSerieDetaills() {
  const route = useRoute();
  const {id, type} = route.params as {id: number; type: string};
  console.log(id);

  const {data, isLoading, isError, error} = useGetMovieOrSerie(id, type);
  const {data: trailler} = useGetMovieTrailler(id);
  console.log(trailler);

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>is loading ...</Text>
      </View>
    );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: `http://image.tmdb.org/t/p/w500/${data?.poster_path}`,
            height: 250,
            width: 150,
          }}
        />
        <Text style={styles.title}>
          {type === 'movie' ? data.title : data.name}
        </Text>
      </View>
      <View style={{gap: 5}}>
        <Text style={styles.overview}>{data.overview}</Text>
        <Text style={styles.informations}>Popularity : {data.popularity}</Text>
      </View>
      {trailler && trailler.length && (
        <View>
          <Text style={styles.title}>Trailer : </Text>
          <YoutubePlayer height={300} play={true} videoId={trailler[0].key} />

          {/* <YouTubePlayer videoId={trailler[0].id} /> */}
          {/* <YouTube
            videoId={trailler[0].id} // Replace with the YouTube video ID
            apiKey="AIzaSyA6g45Yt89nnwD7NSvRU2K5O6sGGTGVwIQ" // Replace with your YouTube API key
            style={{alignSelf: 'stretch', height: 300}}
          /> */}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 15,
    gap: 10,
    paddingHorizontal: 15,
  },
  card: {
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
  image: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
  },
  informations: {
    color: 'white',
  },
  overview: {
    color: 'white',
  },
});
