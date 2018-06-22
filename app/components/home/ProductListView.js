import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { $ColorSecondary02 } from './../../assets/css/styles';

export default class ProductListView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Emisión de Pólizas',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
    headerBackTitle: null,
  });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', }}>
        <StatusBar backgroundColor="rgba(198,201,202, .5)" barStyle="dark-content" />
        
        <ScrollView
          contentContainerStyle={styles.insuranceBox}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.productListBox}
            activeOpacity={.6}
            onPress={() => this.props.navigation.navigate('DataDe')}
          >
            <View style={styles.productListIconBox}>
              <Text style={styles.productListIconText}>D</Text>
            </View>
            <View style={styles.productListTitleBox}>
              <Text style={styles.productListTitle}>Desgravamen</Text>
              <Text style={styles.productListTitleDescription}>
                Lorem Ipsum es simplemente el texto de relleno de las imprentas 
                y archivos de texto. Lorem Ipsum ha sido el texto de relleno 
                estándar de las industrias desde el año 1500, cuando un impresor 
                (N. del T. persona que se dedica a la imprenta) desconocido 
              </Text>
            </View>
            <View style={styles.productListArrowBow}>
              <Icon name="ios-arrow-forward" size={35} color={$ColorSecondary02} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}