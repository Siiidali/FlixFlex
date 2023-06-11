import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import {useState, useEffect, useRef} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import Content from '../components/Content';
import {useGetSeries, useGetTopSeries} from '../hooks/series';
import {getSeries} from '../api/series';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import {TMDBShow} from '../types/apiTypes';

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
    data: series,
    status,
    error,
    isPreviousData,
    isFetching,
  } = useGetSeries(page);

  const {
    data: topSeries,
    error: errorTopSeries,
    status: statusTopSeries,
  } = useGetTopSeries();

  // Prefetch the next page
  useEffect(() => {
    if (!isPreviousData && series?.total_pages! > page) {
      queryClient.prefetchQuery({
        queryKey: ['Series', page + 1],
        queryFn: () => getSeries(page + 1),
      });
    }
  }, [series, isPreviousData, page, queryClient]);

  const handleItemPress = (item: TMDBShow) => {
    navigation.navigate('MovieSerieDetails', {id: item.id, type: 'serie'});
  };

  const scrollToAllSeries = () => {
    allMoviesRef.current?.measureLayout(
      scrollViewRef.current?.getInnerViewNode(),
      (x, y) => {
        scrollViewRef.current?.scrollTo({y, animated: true});
      },
    );
  };

  if (status === 'error')
    return <Text>{error.response!.data!.toString()}</Text>;
  if (status === 'loading') return <Text>is loading</Text>;

  return (
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.topSeries} ref={allMoviesRef}>
        <Text style={styles.title}>Top Series</Text>

        {topSeries?.results && (
          <FlatList
            data={topSeries?.results}
            renderItem={({item}) => (
              <Content
                element={item}
                onPress={() => {
                  handleItemPress(item);
                }}
              />
            )}
            horizontal
            contentContainerStyle={{columnGap: 20}}
          />
        )}
      </View>

      <View style={styles.allSeries}>
        <Text style={styles.title}>
          All Series {`  ${page} / ${topSeries?.total_pages}`}
        </Text>
        {isFetching ? (
          <Text style={{color: 'white'}}>Is loading ...</Text>
        ) : (
          <View style={{gap: 20}}>
            <FlatList
              data={series.results}
              renderItem={({item}) => (
                <Content
                  element={item}
                  onPress={() => {
                    handleItemPress(item);
                  }}
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
                  scrollToAllSeries();
                  setPages(old => Math.max(old - 1, 0));
                }}>
                <Text style={styles.textBtn}>Previous</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  scrollToAllSeries();
                  setPages(old => (series?.total_pages > page ? old + 1 : old));
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
  topSeries: {
    gap: 20,
  },
  allSeries: {
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
