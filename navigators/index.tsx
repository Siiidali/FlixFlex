import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import auth from '@react-native-firebase/auth';
import {TabsNavigator} from './TabsNavigator';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  //   const user = auth().currentUser;
  //   console.log(user);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabsNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
