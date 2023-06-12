import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={SignIn}
        name="SignIn"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignUp}
        name="SignUp"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
