import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NotificationStack extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Notificaciones',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-notifications" size={25} color={tintColor} />),
  });

  render() {
    return (
      <View>
        <Text> NotificationStack </Text>
        <Text> NotificationStack </Text>
        <Text> NotificationStack </Text>
        <Text> NotificationStack </Text>
        <Text> NotificationStack </Text>
      </View>
    )
  }
}