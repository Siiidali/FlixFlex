import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './navigators/TabsNavigator';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
