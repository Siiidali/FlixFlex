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
  const {
    data: trailler,
    isLoading: isLoadingTrailler,
    isError: isErrorTrailler,
    error: errorTrailler,
  } = useGetMovieTrailler(id);
  console.log(isErrorTrailler);
  console.log(errorTrailler);

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>is loading ...</Text>
      </View>
    );
  if (isError)
    return (
      <View style={styles.container}>
        <Text>{error.response.data.message}</Text>
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
      <View style={{gap: 20}}>
        <Text style={styles.overview}>{data.overview}</Text>
        <Text style={styles.informations}>Popularity : {data.popularity}</Text>
      </View>
      <View>
        <Text style={styles.title}>Trailer : </Text>
        {isLoadingTrailler ? (
          <View>
            <Text style={{color: 'white'}}>is loading ...</Text>
          </View>
        ) : null}
        {isErrorTrailler ? (
          <View>
            <Text style={{color: 'white'}}>
              The trailler of this coudn't be found
            </Text>
          </View>
        ) : null}
        {trailler && trailler.length && (
          <YoutubePlayer height={300} play={true} videoId={trailler[0].key} />
        )}
      </View>
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
