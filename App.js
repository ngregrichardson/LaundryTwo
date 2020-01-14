/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Locations from './src/screens/locations';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {IconButton} from 'react-native-paper';

const Navigator = createAppContainer(
  createDrawerNavigator(
    {
      Locations: {
        navigationOptions: {
          drawerIcon: ({tintColor}) => <IconButton icon={'home'} />,
          drawerLabel: 'Locations',
        },
        screen: Locations,
      },
    },
    {initialRouteName: 'Locations'},
  ),
);

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Navigator />
      </SafeAreaView>
    </>
  );
};

export default App;
