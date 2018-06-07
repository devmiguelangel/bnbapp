import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { SignInView } from './../../components/auth/SignInView';
import { SignUpView } from './../../components/auth/SignUpView';

const Stack = createStackNavigator(
  {
    SignIn: SignInView,
    SignUp: SignUpView,
    // App: DetailsScreen,
  },
  {
    initialRouteName: 'SignIn',
    navigationOptions: {
      headerStyle: {
        ...Platform.select({
          ios: {
            borderBottomWidth: 0,
          },
          android: {
            backgroundColor: 'transparent',
          }
        })
      },
    },
  }
);

export default class AuthStack extends Component {
  render() {
    return (
      <Stack />
    )
  }
}