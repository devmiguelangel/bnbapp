import React, { Component } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { auth } from './../../utils/firebase';

import Loading from './../../commons/Loading';

import styles, { $RobotoRegular, $RobotoMedium, $ColorLinkPrimary } from './../../assets/css/styles';

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  
  handleNextField = (field) => {
    this.refs[field].focus();
  }

  handleSignIn = () => {
    this.setState({ isLoading: true });
    
    const { email, password } = this.state;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(error => {
        let message = '';

        switch(error.code) {
          case 'auth/invalid-email':
            message = 'El correo electrónico no es válido.';
            break;
          case 'auth/user-disabled':
            message = 'Su cuenta esta deshabilitada.';
            break;
          case 'auth/user-not-found':
            message = 'Usuario no encontrado.';
            break;
          case 'auth/wrong-password':
            message = 'La contraseña es incorrecta.';
            break;
        }

        Alert.alert(
          'BNB Seguros',
          message,
          [
            { text: 'OK', onPress: () => this.setState({ isLoading: false }) },
          ],
          { cancelable: false }
        );
      });
  }

  render() {
    // const { isLoading } = this.state;

    return (
      <ImageBackground
        source={require('./../../assets/img/bg-app.png')}
        style={styles.authContainer}
      >
        <Loading visible={this.state.isLoading} />

        <Image
          source={require('./../../assets/img/logo-app-01.png')}
          style={[styles.logoMain, css.logoMain]}
        />
        
        <View style={styles.signInFormBox}>
          <View style={[styles.sigInInputBox, { marginTop: 75 }]}>
            <View style={styles.sigInInputIcon}>
              <Icon name="md-contact" size={40} color="#CFD8DC" />
            </View>
            <TextInput
              style={styles.signInInputField}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Correo Electrónico"
              placeholderTextColor="#FFFFFF"
              returnKeyType="next"
              underlineColorAndroid="transparent"
              selectionColor="#757575"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              onSubmitEditing={() => this.handleNextField('password')}
            />
          </View>
          <View style={styles.sigInInputBox}>
            <View style={styles.sigInInputIcon}>
              <Icon name="ios-lock" size={40} color="#CFD8DC" />
            </View>
            <TextInput
              ref="password"
              style={styles.signInInputField}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Contraseña"
              placeholderTextColor="#FFFFFF"
              underlineColorAndroid="transparent"
              selectionColor="#757575"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={this.handleSignIn}
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
          style={styles.btnLarge}
          activeOpacity={0.8}
          onPress={this.handleSignIn}
        >
          <Text style={styles.btnLargeText}>Iniciar Sesión</Text>
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
    fontFamily: $RobotoMedium,
    fontSize: 14,
    color: $ColorLinkPrimary,
  },
  newAccountBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 142,
    height: 35,
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 8,
  },
  newAccountText: {
    fontFamily: $RobotoRegular,
    fontSize: 14,
    color: 'white',
  },
});