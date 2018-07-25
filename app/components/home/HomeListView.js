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

import ActionSheetView from './../../commons/ActionSheetView';
import styles, {
  $ColorStatusBar02,
  $ColorSuccess,
  $ColorDanger,
  $ColorInfo,
  $ColorSecondary,
  $ColorLight,
} from './../../assets/css/styles';

export default class HomeListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: false,
      options: [
        {
          text: 'Desgravamen',
          icon: 'ios-apps',
        },
        {
          text: 'Cancelar',
        },
      ],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  handleAction = (action = true, index = -1) => {
    this.setState({ action: action });

    switch (index) {
      case 0:
        this.props.navigation.navigate('deData');
        break;
    }
  }

  render() {
    const { action, options } = this.state;

    return (
      <Fragment>
        <StatusBar backgroundColor={$ColorStatusBar02} barStyle="light-content" />

        <View style={[styles.container, { backgroundColor: 'white', }]}>
          <View style={styles.logoBox}>
            <Image
              source={require('./../../assets/img/logo-app-02.png')}
              style={styles.logoSecond}
            />
          </View>

          <ScrollView
            contentContainerStyle={[styles.insuranceBox, { paddingTop: 0, }]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.insuranceContainer}
              activeOpacity={0.7}
              onPress={() => this.handleAction()}
            >
              <View style={[styles.insuranceIconBox, { borderLeftColor: '#66BB6A', }]}>
                <Icon name="ios-apps" size={50} color="#B0BEC5" />
              </View>
              <Text style={styles.insuranceLabel}>
                Emisión de Pólizas
              </Text>
              <Icon name="md-more" size={30} color="#939BA8" style={styles.insuranceIconMore} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.insuranceContainer}
              activeOpacity={0.7}
            >
              <View style={[styles.insuranceIconBox, { borderLeftColor: '#EF5350', }]}>
                <Icon name="ios-close-circle" size={50} color="#B0BEC5" />
              </View>
              <Text style={styles.insuranceLabel}>
                Anulaciones
              </Text>
              <Icon name="md-more" size={30} color="#939BA8" style={styles.insuranceIconMore} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.insuranceContainer}
              activeOpacity={0.7}
            >
              <View style={[styles.insuranceIconBox, { borderLeftColor: '#4DC5F0', }]}>
                <Icon name="ios-stats" size={50} color="#B0BEC5" />
              </View>
              <Text style={styles.insuranceLabel}>
                Reportes
              </Text>
              <Icon name="md-more" size={30} color="#939BA8" style={styles.insuranceIconMore} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.insuranceContainer}
              activeOpacity={0.7}
            >
              <View style={[styles.insuranceIconBox, { borderLeftColor: '#FDEB71', }]}>
                <Icon name="ios-filing" size={50} color="#B0BEC5" />
              </View>
              <Text style={styles.insuranceLabel}>
                Líneas de Crédito
              </Text>
              <Icon name="md-more" size={30} color="#939BA8" style={styles.insuranceIconMore} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.insuranceContainer}
              activeOpacity={0.7}
            >
              <View style={[styles.insuranceIconBox, { borderLeftColor: '#85BACD', }]}>
                <Icon name="ios-cog" size={50} color="#B0BEC5" />
              </View>
              <Text style={styles.insuranceLabel}>
                Operaciones bajo Línea
              </Text>
              <Icon name="md-more" size={30} color="#939BA8" style={styles.insuranceIconMore} />
            </TouchableOpacity>

          </ScrollView>
        </View>

        {
          action && (
            <ActionSheetView
              options={options}
              handleAction={this.handleAction}
            />
          )
        }
      </Fragment>
    )
  }
}