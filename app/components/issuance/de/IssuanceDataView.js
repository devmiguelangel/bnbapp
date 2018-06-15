import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { $ColorDanger } from './../../../assets/css/styles';

export default class IssuanceDataView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Préstamo',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left'
    },
    headerBackImage: ({ tintColor }) => (
      Platform.select({
        ios: (<Text style={{ color: $ColorDanger, fontSize: 16, paddingLeft: 15 }}>Cancelar</Text>),
        android: (<Icon name="md-close-circle" size={35} color={$ColorDanger} style={{ paddingLeft: 15 }} />)
      })
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.issuanceBox}
          activeOpacity={1}
        >
          <View style={styles.issuanceInputBox}>
            <Text style={styles.issuanceInput}>
              Tipo de Cobertura
            </Text>
          </View>
          <View style={styles.issuanceIconBox}>
            <Icon name="ios-arrow-down" size={25} color="#607D8B" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}