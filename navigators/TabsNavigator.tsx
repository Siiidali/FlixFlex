import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Series from '../screens/Series';
import Search from '../screens/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieSerieDetaills from '../screens/MovieSerieDetaills';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const createStackNavigator = (Component: any) => {
  const StackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Component}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieSerieDetails"
          component={MovieSerieDetaills}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  return StackNavigator;
};

export const TabsNavigator = () => {
  console.log('ssss');

  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: 'black'},
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
      }}>
      <Tab.Screen
        name="Movies"
        component={createStackNavigator(Movies)}
        options={{
          title: 'Movies',
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/movie.png')}
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={createStackNavigator(Series)}
        options={{
          title: 'Series',
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/tv-show.png')}
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={createStackNavigator(Search)}
        options={{
          title: 'Search',
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/search.png')}
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
