import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const SignIn = () => {
  const [email, setEmail] = useState<string>('dadisisaber@gmail.com');
  const [password, setPassword] = useState<string>('sidali123');

  const handleSignIn = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View>
      <Pressable onPress={handleSignIn}>
        <Text>Click</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
