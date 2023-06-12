import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const logOut = async () => {
    try {
      const singout = await auth().signOut();
      console.log(singout);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={{gap: 10}}>
        <Text style={styles.logout}>LogOut</Text>
        <TouchableOpacity onPress={logOut} style={styles.btn}>
          <Text style={styles.logoutText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 30,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  logout: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
  },
  btn: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    width: 200,
  },
  logoutText: {
    color: 'white',
  },
});

export default Home;
