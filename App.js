import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screens/Authentication/Main';
import {AuthProvider} from './src/constant/Auth';
import {Provider} from 'react-redux';
import fetchApproximateLocation from './src/screens/Authentication/fetchApproximateLocation';
import {myStore} from './src/redux/myStore';

const App = () => {
  useEffect(() => {
    fetchApproximateLocation();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Provider store={myStore}>
          <Main />
        </Provider>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
