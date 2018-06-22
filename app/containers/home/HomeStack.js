import React, { Component, Fragment } from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import reducer from './../../reducers/home';

import HomeListView from './../../components/home/HomeListView';
import ProductListView from './../../components/home/ProductListView';
import DataView from './../../components/issuance/de/DataView';
import DetailView from './../../components/issuance/de/DetailView';

const Insurance = createStackNavigator(
  {
    HomeList: HomeListView,
    ProductList: ProductListView,
    /* DE Issuance */
    DataDe: DataView,
    Detail: DetailView,
  },
  {
    initialRouteName: 'HomeList',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#F9FCFD'
      },
      gesturesEnabled: true,
    }
  }
);

const store = createStore(
  reducer,
  {},
);

export default class HomeContainer extends Component {
  static router = Insurance.router;

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ tintColor }) => (<Icon name="md-home" size={25} color={tintColor} />),
  });

  render() {
    return (
      <Provider store={store}>
        <Insurance navigation={this.props.navigation} />
      </Provider>
    )
  }
}