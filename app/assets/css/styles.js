import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoMain: {
    width: 250,
    height: 136,
  },
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
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    color: '#607D8B',
  },
});