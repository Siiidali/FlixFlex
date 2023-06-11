import {View, Text, Button} from 'react-native';

const Home = ({navigation}: any) => {
  return (
    <View>
      <Text></Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Movies')}
      />
    </View>
  );
};

export default Home;
