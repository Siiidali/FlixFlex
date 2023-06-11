import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface ContentProps {
  element: any;
  onPress: any;
}

const Content = ({element, onPress}: ContentProps) => {
  const handlePress = () => {
    onPress(element);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `http://image.tmdb.org/t/p/w500/${element?.poster_path}`,
            height: 250,
            width: 150,
          }}
        />
        <View style={styles.informations}>
          <Text style={styles.title}>
            {element.media_type === 'tv' || element.name
              ? element?.name
              : element?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
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
  },
  informations: {
    paddingHorizontal: 10,
  },
});

export default Content;
