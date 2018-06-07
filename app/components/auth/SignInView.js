import React, { Component } from 'react';
import {
  Image,
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

export class SignInView extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  render() {
    return (
      <ImageBackground
        source={require('./../../assets/img/bg-app.png')}
        style={styles.container}
      >
        <StatusBar backgroundColor="#00897B" barStyle="light-content" />
        <View style={styles.container}>
          <Image
            source={require('./../../assets/img/logo-app-01.png')}
            style={[styles.logoMain, css.logoMain]}
          />

          <View style={[styles.sigInInputBox, { marginTop: 75 }]}>
            <View style={styles.sigInInputIcon}>
              <Icon name="md-contact" size={40} color="#CFD8DC" />
            </View>
            <TextInput
              style={styles.signInInputField}
              placeholder="Correo Electrónico"
              placeholderTextColor="#FFFFFF"
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.sigInInputBox}>
            <View style={styles.sigInInputIcon}>
              <Icon name="ios-lock" size={40} color="#CFD8DC" />
            </View>
            <TextInput
              style={styles.signInInputField}
              placeholder="Contraseña"
              placeholderTextColor="#FFFFFF"
              keyboardType="default"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={css.passwordForgotLink}
            activeOpacity={0.6}
          >
            <Text style={css.passwordForgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={css.newAccountBtn}
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={css.newAccountText}>Crear una cuenta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnOne}
          activeOpacity={0.8}
        >
          <Text style={styles.btnOneText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const css = StyleSheet.create({
  logoMain: {
    marginTop: 65,
  },
  passwordForgotLink: {
    marginTop: 20,
  },
  passwordForgotText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#EFEBE9',
  },
  newAccountBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 142,
    height: 35,
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 8,
  },
  newAccountText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
});