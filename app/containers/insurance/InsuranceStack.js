import React, { Component, Fragment } from 'react';
import {
  Platform,
  StatusBar,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import InsuranceView from './../../components/insurance/InsuranceView';

const Insurance = createStackNavigator(
  {
    Insurance: InsuranceView,
  },
  {
    initialRouteName: Insurance,
  }
);

export default class HomeContainer extends Component {
  static router = Insurance.router;

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ tintColor }) => (<Icon name="md-home" size={25} color={tintColor} />),
  });

  render() {
    return (
      <Fragment>
        <StatusBar backgroundColor="#00897B" barStyle="light-content" />
        
        <Insurance navigation={this.props.navigation} />
      </Fragment>
    )
  }
}