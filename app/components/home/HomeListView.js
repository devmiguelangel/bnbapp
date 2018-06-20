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

import styles, {
  $ColorStatusBar02,
  $ColorSuccess,
  $ColorDanger,
  $ColorInfo,
  $ColorSecondary,
  $ColorLight,
} from './../../assets/css/styles';

export default class HomeListView extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    return (
      <Fragment>
        <StatusBar backgroundColor={$ColorStatusBar02} barStyle="light-content" />

        <View style={styles.container}>
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
              style={[styles.insuranceContainer, { backgroundColor: $ColorSuccess }]}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('ProductList')}
            >
              <View style={styles.insuranceIconBox}>
                <Icon name="ios-albums" size={60} color="white" />
              </View>
              <Text style={styles.insuranceLabel}>
                Emisión de Pólizas
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.insuranceContainer, { backgroundColor: $ColorDanger }]}
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
              style={[styles.insuranceContainer, { backgroundColor: $ColorInfo }]}
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
              style={[styles.insuranceContainer, { backgroundColor: $ColorLight }]}
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
              style={[styles.insuranceContainer, { backgroundColor: $ColorSecondary }]}
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
        </View>
      </Fragment>
    )
  }
}