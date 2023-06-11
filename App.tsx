import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigators';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
