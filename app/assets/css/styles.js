import {
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';

/* Fonts */
export const $RobotoRegular = 'Roboto-Regular';
export const $RobotoMedium = 'Roboto-Medium';
export const $RobotoLight = 'Roboto-Light';
export const $MontserratMedium = 'Montserrat-Medium';

/* Colors */
export const $ColorBg = '#FFFFFF';
export const $ColorStatusBar01 = '#00897B';
export const $ColorStatusBar02 = '#102027';
export const $ColorLinkPrimary = '#EFEBE9';

export const $ColorPrimary = '#007AFF';
export const $ColorSecondary = '#666666';
export const $ColorSecondary02 = '#607D8B';
export const $ColorSuccess = '#4CD964';
export const $ColorInfo = '#5AC8FA';
export const $ColorWarning = '#FF9500';
export const $ColorLight = '#FFCC00';
export const $ColorDanger = '#FF3B30';
export const $ColorFormText = '#37474F';

export default StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    backgroundColor: $ColorBg,
  },
  /* Logo */
  authContainer: {
    flex: 1,
    alignItems: 'center'
  },
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
  signInFormBox: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
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
    fontFamily: $RobotoRegular,
    fontSize: 16,
  },
  /* Buttons */
  btnLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 55,
    backgroundColor: '#ECEFF1',
  },
  btnLargeText: {
    fontFamily: $RobotoLight,
    fontSize: 22,
    color: $ColorSecondary02,
  },
  btnSuccessLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 55,
    backgroundColor: $ColorSuccess,
  },
  btnSuccessLargeText: {
    fontFamily: $RobotoLight,
    fontSize: 22,
    color: 'white',
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
    backgroundColor: $ColorBg,
  },
  insuranceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: 110,
    marginBottom: 15,
    backgroundColor: 'white',
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
  /* Product List */
  productListBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '95%',
    height: 120,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(58,137,137, .2)',
    borderRadius: 3,
  },
  productListIconBox: {
    width: 55,
    height: 55,
    backgroundColor: '#66BB6A',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productListIconText: {
    fontFamily: $MontserratMedium,
    fontSize: 35,
    color: '#FFFFFF',
    ...Platform.select({
      android: {
        marginTop: -5,
      }
    })
  },
  productListTitleBox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  productListTitle: {
    fontFamily: $RobotoRegular,
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
  },
  productListTitleDescription: {
    flex: 1,
    fontFamily: $RobotoLight,
    fontSize: 12,
    color: '#8A8A8F',
    textAlign: 'justify',
  },
  productListArrowBow: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  /* Issuance */
  formGroup: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    height: 45,
    marginBottom: 7,
  },
  formBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(58,137,137, .2)',
    borderRadius: 5,
  },
  formInput: {
    flex: 1,
    fontFamily: $RobotoRegular,
    fontSize: 17,
    color: $ColorFormText,
  },
  formIcon: {
    marginLeft: 10,
  },
  formPicker: {
    flex: 1,
    margin: 0,
    padding: 0
  },
  /* Separator */
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#CFD8DC',
  },
});