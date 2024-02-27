import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screens/Authentication/Main';
import {AuthProvider} from './src/constant/Auth';
import fetchApproximateLocation from './src/screens/Authentication/fetchApproximateLocation';

const App = () => {
  useEffect(() => {
    fetchApproximateLocation();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
