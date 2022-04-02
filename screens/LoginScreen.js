import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class LoadingScreen extends Component {
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };

      onSignIn = googleUser => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
    
            // Sign in with credential from the Google user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function (result) {
                if (result.additionalUserInfo.isNewUser) {
                  firebase
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      locale: result.additionalUserInfo.profile.locale,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      current_theme: "dark"
                    })
                    .then(function (snapshot) { });
                }
              })
              .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
          } else {
            console.log("User already signed-in Firebase.");
          }
        });
      };

  signInWithGoogleAsync = async () => {
      try{
          const result = await this.signInWithGoogleAsync.loginAsync({
              behaviour: "web",
              androidClientId:
"931222283443-ibjee42msmr9coslqrft3bgicvurq1v0.apps.googleusercontent.com",
              iosClientId:
"70667463407-hucqcrqeiqbg7oei3sta8bfh3kptsc1s.apps.googleusercontent.com",
             scopes:['profile', 'email'],
          });
      }catch(e){console.log(e);}
  }
    render() {
        return (
            <View
              style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
              }}>
              <Text>Login</Text>
              </View>
        )
    }
}