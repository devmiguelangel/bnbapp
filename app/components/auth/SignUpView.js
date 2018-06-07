import React, { Component } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './../../assets/css/styles';

export class SignUpView extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTransparent: true,
    headerTintColor: 'white',
    headerBackTitleStyle: {
      color: 'white',
    },
  })

  render() {
    return (
      <ImageBackground
        source={require('./../../assets/img/bg-app.png')}
        style={styles.container}
      >
        <StatusBar backgroundColor="#00897B" barStyle="light-content" />

        <View style={css.signUpFormBox}>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>NOMBRES Y APELLIDOS</Text>
            <TextInput
              style={styles.signUpInputField}
              keyboardType="default"
              autoCapitalize="words"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>CORREO ELECTRÓNICO</Text>
            <TextInput
              style={styles.signUpInputField}
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>CONTRASEÑA</Text>
            <TextInput
              style={styles.signUpInputField}
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>CONFIRMAR CONTRASEÑA</Text>
            <TextInput
              style={styles.signUpInputField}
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            activeOpacity={0.8}>
            <Icon name="ios-arrow-dropright-circle" size={50} color="#ECEFF1" />
          </TouchableOpacity>

        </View>
      </ImageBackground>
    )
  }
}

const css = StyleSheet.create({
  signUpFormBox: {
    width: '75%',
    marginTop: 90,
  }
});