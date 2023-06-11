import {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {useSearch} from '../hooks/search';
import Content from '../components/Content';
import {useFocusEffect} from '@react-navigation/native';

const Search = () => {
  const [movieOrSerie, setMovieorSerie] = useState<string>('');
  const {data, isLoading, isError, error} = useSearch(movieOrSerie);

  useFocusEffect(
    useCallback(() => {
      setMovieorSerie('');
    }, []),
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Enter the Serie/Movie title</Text>
        <TextInput
          style={styles.textInput}
          value={movieOrSerie}
          onChangeText={text => setMovieorSerie(text)}
          placeholder="Serie/Movie title"
          placeholderTextColor="white"
        />
        <View>
          <FlatList
            data={data?.results}
            renderItem={({item}) => <Content element={item} />}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: 200}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            key={'#'}
            ItemSeparatorComponent={() => <View style={styles.rowSperator} />}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    gap: 20,
  },
  rowSperator: {
    height: 30,
  },
});

export default Search;