import React, { Component, Fragment } from 'react';
import {
  Platform,
  StatusBar,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SignInView from './../../components/auth/SignInView';
import SignUpView from './../../components/auth/SignUpView';

import { $ColorStatusBar01 } from './../../assets/css/styles';

const Stack = createStackNavigator(
  {
    SignIn: SignInView,
    SignUp: SignUpView,
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
      <Fragment>
        <StatusBar backgroundColor={$ColorStatusBar01} barStyle="light-content" />

        <Stack />
      </Fragment>
    )
  }
}