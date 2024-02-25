import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screens/Authentication/Main';
import {AuthProvider} from './src/constant/Auth';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
