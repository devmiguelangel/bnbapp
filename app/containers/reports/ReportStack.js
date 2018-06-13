import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ReportContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Reportes',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-stats" size={25} color={tintColor} />),
  });

  render() {
    return (
      <View>
        <Text> ReportContainer </Text>
        <Text> ReportContainer </Text>
        <Text> ReportContainer </Text>
        <Text> ReportContainer </Text>
        <Text> ReportContainer </Text>
        <Text> ReportContainer </Text>
        <Text> ReportContainer </Text>
      </View>
    )
  }
}