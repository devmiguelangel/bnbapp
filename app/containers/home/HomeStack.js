import React, { Component, Fragment } from 'react';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeListView from './../../components/home/HomeListView';
import ProductListView from './../../components/home/ProductListView';
import DataView from './../../components/issuance/de/DataView';

const Insurance = createStackNavigator(
  {
    HomeList: HomeListView,
    ProductList: ProductListView,
    /* DE Issuance */
    DataDe: DataView,
  },
  {
    initialRouteName: 'HomeList',
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