import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import Series from '../screens/Series';
import Search from '../screens/Search';
import CustomIcon from '../components/CustomIcon';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieSerieDetaills from '../screens/MovieSerieDetaills';

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

export const Navigator = () => {
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
            <CustomIcon name="film" color={color} size={20} />
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
            <CustomIcon name="plus" color={color} size={20} />
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
            <CustomIcon name="search" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
