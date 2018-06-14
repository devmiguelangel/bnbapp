import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { $ColorDanger } from './../../../assets/css/styles';

export default class IssuanceStack extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Desgravamen',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
    headerBackImage: ({ tintColor }) => {
      return Platform.select({
        ios: (<Text style={{ color: $ColorDanger, fontSize: 16, paddingLeft: 15 }}>Cancelar</Text>),
        android: (<Icon name="md-close-circle" size={35} color={$ColorDanger} style={{ paddingLeft: 15 }} />)
      })
    },
  });

  componentWillUnmount = () => {
    
  }
  

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