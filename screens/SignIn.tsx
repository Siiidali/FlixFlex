import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        console.log('That email address is already in use!');

        console.error(error);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.content}>
        <Text style={styles.text}>E-mail Adress</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your e-mail"
          placeholderTextColor="white"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Enter your password"
          placeholderTextColor="white"
        />
        <Pressable style={styles.btn} onPress={handleSignIn}>
          <Text style={styles.btntext}>Click</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 40,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
  },
  text: {
    color: 'white',
  },
  content: {
    gap: 30,
  },

  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '50%',
  },
  btntext: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignIn;
