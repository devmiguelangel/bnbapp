import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import AuthStack from './containers/auth/AuthStack';

export default class App extends Component {
  render() {
    return (
      <AuthStack />
    )
  }
}