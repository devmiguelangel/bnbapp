import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './../../assets/css/styles';

export default class InsuranceStack extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Seguros',
    tabBarIcon: ({ tintColor }) => (<Text style={[styles.iconHome, { color: tintColor }]}>B</Text>),
  });

  render() {
    return (
      <View>
        <Text> InsuranceStack </Text>
        <Text> InsuranceStack </Text>
        <Text> InsuranceStack </Text>
        <Text> InsuranceStack </Text>
        <Text> InsuranceStack </Text>
        <Text> InsuranceStack </Text>
      </View>
    )
  }
}