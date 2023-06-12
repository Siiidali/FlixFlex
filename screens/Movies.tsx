import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';
import {useGetMovies, useGetTopMovies} from '../hooks/movies';
import {useState, useEffect, useRef} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {getMovies} from '../api/movies';
import Content from '../components/Content';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import {TMDBMovie} from '../types/apiTypes';
export type RootStackParamList = {
  MovieSerieDetails: {id: number; type: string} | undefined;
};

const Movies = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const scrollViewRef = useRef<ScrollView>(null);
  const allMoviesRef = useRef<View>(null);
  const [page, setPages] = useState<number>(1);
  const {
    data: movies,
    isError,
    status,
    error,
    isPreviousData,
    isFetching,
  } = useGetMovies(page);

  const {
    data: topMovies,
    isError: isErrorTopMovies,
    error: errorTopMovie,
    status: statusTopMovie,
  } = useGetTopMovies();

  // Prefetch the next page
  useEffect(() => {
    if (!isPreviousData && movies?.total_pages! > page) {
      queryClient.prefetchQuery({
        queryKey: ['movies', page + 1],
        queryFn: () => getMovies(page + 1),
      });
    }
  }, [movies, isPreviousData, page, queryClient]);

  const handleItemPress = (item: TMDBMovie) => {
    navigation.navigate('MovieSerieDetails', {id: item.id, type: 'movie'});
  };
  const scrollToAllMovies = () => {
    allMoviesRef.current?.measureLayout(
      scrollViewRef.current?.getInnerViewNode(),
      (x, y) => {
        scrollViewRef.current?.scrollTo({y, animated: true});
      },
    );
  };
  console.log(error);

  if (isError) return <Text>{error?.response?.data?.toString()}</Text>;
  if (status === 'loading') return <Text>is loading</Text>;

  return (
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.topMovies} ref={allMoviesRef}>
        <Text style={styles.title}>Top Movies</Text>

        {topMovies?.results && (
          <FlatList
            data={topMovies?.results}
            renderItem={({item}) => (
              <Content
                onPress={() => {
                  handleItemPress(item);
                }}
                element={item}
              />
            )}
            horizontal
            contentContainerStyle={{columnGap: 20}}
          />
        )}
      </View>

      <View style={styles.allMovies}>
        <Text style={styles.title}>
          All Movies {`  ${page} / ${topMovies?.total_pages}`}
        </Text>
        {isFetching ? (
          <Text style={{color: 'white'}}>Is loading ...</Text>
        ) : (
          <View style={{gap: 20}}>
            <FlatList
              data={movies.results}
              scrollEnabled={false}
              renderItem={({item}) => (
                <Content
                  onPress={() => {
                    handleItemPress(item);
                  }}
                  element={item}
                />
              )}
              numColumns={2}
              keyExtractor={item => item.id.toString()}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              key={'#'}
              ItemSeparatorComponent={() => <View style={styles.rowSperator} />}
            />
            <View style={styles.btns}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  scrollToAllMovies();
                  setPages(old => Math.max(old - 1, 0));
                }}>
                <Text style={styles.textBtn}>Previous</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  scrollToAllMovies();
                  setPages(old => (movies?.total_pages > page ? old + 1 : old));
                }}>
                <Text style={styles.textBtn}>Next</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    gap: 20,
    backgroundColor: 'black',
  },
  contentContainer: {
    paddingBottom: 60, // Adjust this value as needed
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  topMovies: {
    gap: 20,
  },
  allMovies: {
    gap: 20,
    width: '100%',
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    minWidth: 100,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    color: 'white',
  },
  rowSperator: {
    height: 30,
  },
});

export default Movies;
