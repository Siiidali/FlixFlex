import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {TabsNavigator} from './navigators/TabsNavigator';
import {AuthNavigator} from './navigators/AuthNavigator';
const queryClient = new QueryClient();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {user ? <TabsNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
