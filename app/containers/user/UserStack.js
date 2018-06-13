import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class UserStack extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Perfil',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-person" size={30} color={tintColor} />),
  });

  render() {
    return (
      <View>
        <Text> UserStack </Text>
        <Text> UserStack </Text>
        <Text> UserStack </Text>
        <Text> UserStack </Text>
        <Text> UserStack </Text>
      </View>
    )
  }
}