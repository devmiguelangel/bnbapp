import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';

import styles from './../../../assets/css/styles';

export default class IssuanceStack extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Desgravamen',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
    ...Platform.select({
      android: {
        headerBackImage: (<Text>Atras</Text>)
      }
    })
  });

  render() {
    return (
      <View style={styles.container}>
        <Text> IssuanceDeStack </Text>
        <Text> IssuanceDeStack </Text>
        <Text> IssuanceDeStack </Text>
        <Text> IssuanceDeStack </Text>
        <Text> IssuanceDeStack </Text>
        <Text> IssuanceDeStack </Text>
        <Text> IssuanceDeStack </Text>
      </View>
    )
  }
}