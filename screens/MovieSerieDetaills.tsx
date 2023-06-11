import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {TMDBMovie, TMDBShow} from '../types/apiTypes';
import {useGetSerie} from '../hooks/series';

export default function MovieSerieDetaills() {
  const route = useRoute();
  const {id, type} = route.params as {id: number; type: string};

  const {data, isLoading, isError, error} =
    type === 'serie' ? useGetSerie(id) : useGetSerie(id);

  return (
    <View style={styles.container}>
      <Text>MovieDetaills</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
