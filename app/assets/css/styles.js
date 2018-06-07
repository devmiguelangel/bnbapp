import { StyleSheet } from 'react-native';

/* Fonts */
const $RobotoRegular = 'Roboto-Regular';
const $RobotoMedium = 'Roboto-Medium';
const $RobotoLight = 'Roboto-Light';

export default StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  /* Logo */
  logoMain: {
    width: 250,
    height: 136,
  },
  /* Sign In */
  sigInInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    height: 45,
    marginTop: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: '#CFD8DC',
  },
  sigInInputIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInInputField: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 10,
    fontFamily: $RobotoRegular,
    fontSize: 16,
  },
  btnOne: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 55,
    backgroundColor: '#ECEFF1',
  },
  btnOneText: {
    fontFamily: $RobotoLight,
    fontSize: 22,
    color: '#607D8B',
  },
  /* Sign Up */
  signUpInputBox: {
    width: '100%',
    height: 55,
    borderBottomWidth: 1.5,
    borderBottomColor: '#CFD8DC',
    marginBottom: 40,
  },
  signUpInputLabel: {
    color: '#EFEBE9',
    fontFamily: $RobotoMedium,
    fontSize: 12,
  },
  signUpInputField: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: $RobotoRegular,
    fontSize: 16,
  },
});