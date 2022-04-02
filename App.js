import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";
import  {createSwitchNavigator, createaAppContainer} from "react-navigation";

import * as firebase from "firebase";
import { firebaseConfig } from './config';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen

})

const AppNavigator = createaAppContainer(AppSwitchNavigator)

export default function App() {
  return (
   <AppNavigator />
  );
}