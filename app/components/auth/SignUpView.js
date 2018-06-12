import React, { Component } from 'react';
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { auth, db } from './../../utils/firebase';

import Loading from './../../commons/Loading';

import styles from './../../assets/css/styles';

export class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerTransparent: true,
    headerTintColor: 'white',
    headerBackTitleStyle: {
      color: 'white',
    },
  });

  handleNextField = (field) => {
    this.refs[field].focus();
  }

  handleSignUp = () => {
    const { fullName, email, password, confirmPassword } = this.state;

    if (! fullName.match(/^[a-z\-_\s]+$/i)) {
      Alert.alert(
        'BNB Seguros',
        'El formato del Nombres y Apellidos es incorrecto.',
        [
          { text: 'OK', }
        ]
      );

      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'BNB Seguros',
        'Las contraseñas no coinciden.',
        [
          { text: 'OK', }
        ]
      );

      return false;
    }

    this.setState({ isLoading: true });

    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        this.setState({ isLoading: false });
        
        db.collection('users').add({
          fullName,
          authRef: auth.user.uid,
        })
          .then(() => {
            
          })
          .catch(error => {
            
          });
      })
      .catch(error => {
        this.setState({ isLoading: false });

        let message = '';

        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'El correo electrónico está siendo usado.';
            break;
          case 'auth/invalid-email':
            message = 'El correo electrónico no es válido.';
            break;
          case 'auth/operation-not-allowed':
            message = 'Su cuenta esta deshabilitada.';
            break;
          case 'auth/weak-password':
            message = 'La contraseña es muy débil.';
            break;
        }

        Alert.alert(
          'BNB Seguros',
          message,
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false }
        );
      });
  }

  render() {
    const { isLoading, fullName, email, password, confirmPassword } = this.state;

    return (
      <ImageBackground
        source={require('./../../assets/img/bg-app.png')}
        style={styles.container}
      >
        <Loading visible={isLoading} />
        <StatusBar backgroundColor="#00897B" barStyle="light-content" />

        <View style={css.signUpFormBox}>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>NOMBRES Y APELLIDOS</Text>
            <TextInput
              style={styles.signUpInputField}
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              underlineColorAndroid="transparent"
              selectionColor="#757575"
              value={fullName}
              onChangeText={(fullName) => this.setState({ fullName })}
              onSubmitEditing={() => this.handleNextField('email')}
            />
          </View>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>CORREO ELECTRÓNICO</Text>
            <TextInput
              ref="email"
              style={styles.signUpInputField}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="transparent"
              selectionColor="#757575"
              value={email}
              onChangeText={(email) => this.setState({ email })}
              onSubmitEditing={() => this.handleNextField('password')}
            />
          </View>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>CONTRASEÑA</Text>
            <TextInput
              ref="password"
              style={styles.signUpInputField}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType="next"
              underlineColorAndroid="transparent"
              selectionColor="#757575"
              value={password}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={() => this.handleNextField('confirmPassword')}
            />
          </View>
          <View style={styles.signUpInputBox}>
            <Text style={styles.signUpInputLabel}>CONFIRMAR CONTRASEÑA</Text>
            <TextInput
              ref="confirmPassword"
              style={styles.signUpInputField}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              selectionColor="#757575"
              value={confirmPassword}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              onSubmitEditing={this.handleSignUp}
            />
          </View>

          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            activeOpacity={0.8}
            onPress={this.handleSignUp}
          >
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