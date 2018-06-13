import { Platform, StyleSheet } from 'react-native';

/* Fonts */
const $RobotoRegular = 'Roboto-Regular';
const $RobotoMedium = 'Roboto-Medium';
const $RobotoLight = 'Roboto-Light';
const $MontserratMedium = 'Montserrat-Medium';

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
  logoBox: {
    alignItems: 'center',
    height: 'auto',
    alignSelf: 'stretch',
    backgroundColor: '#37474F',
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        paddingTop: 35,
      }
    })
  },
  logoSecond: {
    width: 290,
    height: 70,
  },
  /* Icon Home */
  iconHome: {
    fontFamily: $MontserratMedium,
    fontSize: 30,
    marginHorizontal: 20,
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
  /* Insurance */
  insuranceBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
    minHeight: '100%',
    height: 'auto',
    paddingVertical: 15,
    backgroundColor: '#F5FCFF',
  },
  insuranceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: 110,
    marginBottom: 15,
    backgroundColor: 'rgba(77,182,172, .8)',
    borderRadius: 5,
  },
  insuranceIconBox: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '25%',
  },
  insuranceLabel: {
    fontFamily: $RobotoMedium,
    fontSize: 17,
    color: 'white',
    marginLeft: 15,
  },
});