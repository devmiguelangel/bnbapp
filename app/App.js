import React, { Component } from 'react';
import {
  Text,
  View,
  YellowBox,
} from 'react-native';

import AuthStack from './containers/auth/AuthStack';

YellowBox.ignoreWarnings([
  'Warning: isMounted',
  'Module RCTImageLoader requires',
]);

export default class App extends Component {
  render() {
    return (
      <AuthStack />
    )
  }
}