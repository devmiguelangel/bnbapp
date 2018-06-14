import React, { Component, Fragment } from 'react';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import InsuranceView from './../../components/insurance/InsuranceView';
import ProductListView from './../../components/insurance/ProductListView';
import IssuanceDeStack from './../issuance/de/IssuanceStack';

const Insurance = createStackNavigator(
  {
    Insurance: InsuranceView,
    ProductList: ProductListView,
    /* DE Issuance */
    IssuanceDe: IssuanceDeStack,
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
        <Insurance navigation={this.props.navigation} />
      </Fragment>
    )
  }
}