import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import AddJob from './src/screens/AddJob';
import ViewJob from './src/screens/ViewJob';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Signup from './src/screens/Signup';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#aed581',
    accent: '#e1ffb1',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Log In',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: 'Sign Up',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Job Tracker',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AddJob"
            component={AddJob}
            options={{
              title: 'Add Job',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ViewJob"
            component={ViewJob}
            options={{
              title: 'View Job',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
