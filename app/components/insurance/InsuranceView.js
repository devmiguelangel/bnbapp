import React, { Component, Fragment } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './../../assets/css/styles';

export default class InsuranceView extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    return (
      <Fragment>
        <StatusBar backgroundColor="#102027" barStyle="light-content" />
        
        <View style={styles.logoBox}>
          <Image
            source={require('./../../assets/img/logo-app-02.png')}
            style={styles.logoSecond}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.insuranceBox}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[styles.insuranceContainer, { backgroundColor: 'rgba(26,188,156, .9)' }]}
            activeOpacity={0.7}
          >
            <View style={styles.insuranceIconBox}>
              <Icon name="ios-albums" size={60} color="white" />
            </View>
            <Text style={styles.insuranceLabel}>
              Emisión de Pólizas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.insuranceContainer, { backgroundColor: 'rgba(231,76,60, .9)' }]}
            activeOpacity={0.7}
          >
            <View style={styles.insuranceIconBox}>
              <Icon name="ios-close-circle" size={60} color="white" />
            </View>
            <Text style={styles.insuranceLabel}>
              Anulaciones
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.insuranceContainer, { backgroundColor: 'rgba(52,152,219, .9)' }]}
            activeOpacity={0.7}
          >
            <View style={styles.insuranceIconBox}>
              <Icon name="ios-checkmark-circle" size={60} color="white" />
            </View>
            <Text style={styles.insuranceLabel}>
              Solicitudes Pre Aprobadas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.insuranceContainer, { backgroundColor: 'rgba(39,174,96, .9)' }]}
            activeOpacity={0.7}
          >
            <View style={styles.insuranceIconBox}>
              <Icon name="ios-card" size={60} color="white" />
            </View>
            <Text style={styles.insuranceLabel}>
              Líneas de Crédito
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.insuranceContainer, { backgroundColor: 'rgba(41,128,185, .9)' }]}
            activeOpacity={0.7}
          >
            <View style={styles.insuranceIconBox}>
              <Icon name="ios-cog" size={60} color="white" />
            </View>
            <Text style={styles.insuranceLabel}>
              Operaciones bajo Línea
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </Fragment>
    )
  }
}