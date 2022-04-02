import React, {Component} from "react";
import {
    View,
    ActivityIndicator
} from "react-native"
import firebase from "firebase"
import { render } from "react-dom";

export default class LoadingScreen extends Component{

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
           if (user) {
               this.props.navigation.navigate('DashboardScreen')
           } else {
               this.props.navigation.navigate('LoginScreen')
           }
    })
  }

render() {
    return (
        <View
        style={{
            flex:1,
            justifyContent: "center",
            alignItems: "center"
        }}
      >
       <Text>Loading</Text>
       <ActivityIndicator size="large" />
      </View>
     )
   }
 }

