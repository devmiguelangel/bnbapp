import React, { Component, Fragment } from 'react';
import {
  Alert,
  Picker,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment, { min } from 'moment';

import { db } from './../../../utils/firebase';
import validation from '@validation';
import PickerView from './../../../commons/PickerView';
import DatePickerView from './../../../commons/DatePickerView';
import LoadingView from './../../../commons/Loading';
import styles, { $ColorFormText } from './../../../assets/css/styles';

class ClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        motherLastName: '',
        marriedName: '',
        dni: '',
        complement: '',
        extension: '',
        birthdate: null,
        placeResidence: '',
        locality: '',
        homeAddress: '',
        businessAddress: '',
        workplace: '',
        activity: '',
        occupationDescription: '',
        phoneNumberHome: '',
        phoneNumberMobile: '',
        phoneNumberOffice: '',
        email: '',
        weight: '',
        height: '',
      },
      labels: {
        extension: 'Seleccione...',
        birthdate: 'dd/mm/YYYY',
        activity: 'Seleccione...',
      },
      options: {
        extensions: [],
        activities: [],
      },
      errors: {},
      isLoading: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Cliente',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left',
    },
    headerBackTitle: null,
  });

  componentDidMount = () => {
    const extensions = [
      { 'value': 'LP', 'label': 'La Paz', },
      { 'value': 'OR', 'label': 'Oruro', },
      { 'value': 'PO', 'label': 'Potosí', },
    ];
    
    const activities = [
      { 'value': 1, 'label': 'OCUPACIONES DE DIRECCIÓN PÚBLICA O PRIVADA.', },
      { 'value': 1126, 'label': 'CULTIVO DE FLORES Y PLANTAS ORNAMENTALES', },
      { 'value': 14290, 'label': 'EXPLOTACION DE OTRAS MINAS Y CANTERAS NCP', },
    ];

    this.setState(prevState => ({
      options: {
        ...prevState.options,
        extensions,
        activities,
      }
    }));
  }

  handleInputChange = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      }
    }));

    this.validateOnChange(name, value);
  }

  validateOnChange = (field, value) => {
    const { errors } = this.state;

    errors[field] = validation(field, value, 'deClientConstraints');

    this.setState({ errors });
  }

  validateBirthdate = (value, field = 'birthdate', minAge = 18, maxAge = 70) => {
    const currentDate = moment().startOf('day');
    const date = moment(value).startOf('day');
    const age = currentDate.diff(date, 'years', true);

    if (age >= minAge && age <= maxAge) {
      return true;
    }
    
    return false;
  }

  handleOpenPicker = (field, lists) => {
    const { data, options } = this.state;

    this.pickerView.handleOpen(field, data[field], options[lists]);
  }

  handleValuePicker = (field, value, lists) => {
    const selectedItem = lists.filter(l => l.value == value)[0];

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: selectedItem.value,
      },
      labels: {
        ...prevState.labels,
        [field]: selectedItem.label,
      }
    }));
  }

  handleDatePicker = (field) => {
    let date = moment().toDate();

    if (this.state.data[field]) {
      date = this.state.data[field];
    }

    this._datePicker._handleOpen(field, date);
  }

  handleDatePickerValue = (field, value) => {
    const error = this.validateBirthdate(value);
    
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: value,
      },
      labels: {
        ...prevState.labels,
        [field]: moment(value).format('DD/MM/YYYY'),
      },
      errors: {
        ...prevState.errors,
        birthdate: error ? null : 'El rango de edades es de [ 18 - 70 ] años',
      }
    }));
  }

  focusNextField = (field) => {
    this.refs[field].focus();
  }

  clientStore = async () => {
    const { data } = this.state;
    const date = moment();
    let clientRef = null;

    const ref = db.collection('clients');
    const querySnapshot = await ref.where('dni', '==', data.dni)
                                    .where('extension', '==', data.extension)
                                    .get();
    
    if (querySnapshot.empty) {
      const docRef = await ref.add({
        debitBalance: 0,
        number: 0,
        addresses: [],
        operations: [],
        createdAt: date.clone().toDate(),
        updatedAt: date.clone().toDate(),
        ...data,
      })
      .catch(error => {
        throw Error('Error adding document');
      });

      if (docRef instanceof Error) {
        throw Error(docRef);
      }

      clientRef = docRef;
    } else if (querySnapshot.size === 1) {
      clientRef = querySnapshot.docs[0].ref;
      
      const docRef = await clientRef.update({
        updatedAt: date.clone().toDate(),
        ...data,
      })
      .catch(error => {
        throw Error('Error updating document');
      });

      if (docRef instanceof Error) {
        throw Error(docRef);
      }
    }
    
    return clientRef;
  }

  detailStore = (clientRef) => {
    const date = moment();
    const { headerRef } = this.props;

    db.collection('deDetails')
      .add({
        headerRef: headerRef,
        clientRef,
        rate: 0,
        amount: 0,
        balance: 0,
        cumulus: 0,
        refinancing: 0,
        parallelCredit: 0,
        headline: 'D',
        involuntaryUnemployment: false,
        process: false,
        createdAt: date.clone().toDate(),
        updatedAt: date.clone().toDate(),
      })
      .then(docRef => {
        this.props.navigation.navigate('deQuestion', {
          detailId: docRef.id,
        });
      })
      .catch(error => {
        throw Error('Error adding document');
      });
  }

  handleStore = () => {
    const { data } = this.state;
    let errors = {};
    let numErrors = 0;

    for (const key in data) {
      if (key == 'birthdate') {
        errors[key] = this.validateBirthdate(data[key]) ? null : 'El rango de edades es de [ 18 - 70 ] años';
      } else {
        errors[key] = validation(key, data[key], 'deClientConstraints');
      }

      if (errors[key]) {
        numErrors++;
      }
    }

    this.setState({ errors });

    if (numErrors > 0) {
      return false;
    }

    this.setState({ isLoading: true });

    this.clientStore()
      .then(clientRef => {
        this.setState({ isLoading: false });

        this.detailStore(clientRef);
      })
      .catch(error => {
        Alert.alert(
          'BNB Seguros',
          error.message,
          [
            { text: 'OK', onPress: () => this.setState({ isLoading: false }) },
          ],
          { cancelable: false }
        );
      });
  }

  render() {
    const { data, labels, options, errors, isLoading } = this.state;

    return (
      <Fragment>
        <LoadingView visible={isLoading} />

        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white', }}>
          <ScrollView
            contentContainerStyle={[styles.insuranceBox, { paddingBottom: 0 }]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nombres *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.firstName}
                    onChangeText={(value) => this.handleInputChange('firstName', value)}
                    onSubmitEditing={() => this.focusNextField('lastName')}
                    onBlur={() => this.validateOnChange('firstName', data.firstName)}
                  />
                </View>
                {errors.firstName ? (<Text style={styles.formError}>{errors.firstName}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Apellido Paterno *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="lastName"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.lastName}
                    onChangeText={(value) => this.handleInputChange('lastName', value)}
                    onSubmitEditing={() => this.focusNextField('motherLastName')}
                    onBlur={() => this.validateOnChange('lastName', data.lastName)}
                  />
                </View>
                {errors.lastName ? (<Text style={styles.formError}>{errors.lastName}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Apellido Materno *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="motherLastName"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.motherLastName}
                    onChangeText={(value) => this.handleInputChange('motherLastName', value)}
                    onSubmitEditing={() => this.focusNextField('marriedName')}
                    onBlur={() => this.validateOnChange('motherLastName', data.motherLastName)}
                  />
                </View>
                {errors.motherLastName ? (<Text style={styles.formError}>{errors.motherLastName}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Apellido de Casada</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="marriedName"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.marriedName}
                    onChangeText={(value) => this.handleInputChange('marriedName', value)}
                    onSubmitEditing={() => this.focusNextField('dni')}
                    onBlur={() => this.validateOnChange('marriedName', data.marriedName)}
                  />
                </View>
                {errors.marriedName ? (<Text style={styles.formError}>{errors.marriedName}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Doc. de Identidad *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="dni"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.dni}
                    onChangeText={(value) => this.handleInputChange('dni', value)}
                    onSubmitEditing={() => this.focusNextField('complement')}
                    onBlur={() => this.validateOnChange('dni', data.dni)}
                  />
                </View>
                {errors.dni ? (<Text style={styles.formError}>{errors.dni}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Complemento</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="complement"
                    keyboardType="default"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="done"
                    underlineColorAndroid="transparent"
                    value={data.complement}
                    onChangeText={(value) => this.handleInputChange('complement', value)}
                    onBlur={() => this.validateOnChange('complement', data.complement)}
                  />
                </View>
                {errors.complement ? (<Text style={styles.formError}>{errors.complement}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Extensión *</Text>
                {
                  Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.formBox}
                      activeOpacity={1}
                      onPress={() => this.handleOpenPicker('extension', 'extensions')}
                    >
                      <Text style={styles.formInput} numberOfLines={1}>{labels.extension}</Text>
                      <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.formBox}>
                      <Picker
                        style={styles.formPicker}
                        selectedValue={data.extension}
                        onValueChange={(itemValue, itemIndex) => this.handleInputChange('extension', itemValue)}
                      >
                        <Picker.Item value="" label="Seleccione..." />
                        {
                          options.extensions.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                        }
                      </Picker>
                    </View>
                  )
                }
                {errors.extension ? (<Text style={styles.formError}>{errors.extension}</Text>) : null}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Fecha de Nacimiento *</Text>
                <TouchableOpacity
                  style={styles.formBox}
                  activeOpacity={0.8}
                  onPress={() => this.handleDatePicker('birthdate')}
                >
                  <Text style={styles.formInput}>
                    {labels.birthdate}
                  </Text>
                  <Icon name="ios-calendar" size={30} color={$ColorFormText} />
                </TouchableOpacity>
                {errors.birthdate ? (<Text style={styles.formError}>{errors.birthdate}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Lugar de Nacimiento *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.placeResidence}
                    onChangeText={(value) => this.handleInputChange('placeResidence', value)}
                    onSubmitEditing={() => this.focusNextField('locality')}
                    onBlur={() => this.validateOnChange('placeResidence', data.placeResidence)}
                  />
                </View>
                {errors.placeResidence ? (<Text style={styles.formError}>{errors.placeResidence}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Localidad *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="locality"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.locality}
                    onChangeText={(value) => this.handleInputChange('locality', value)}
                    onSubmitEditing={() => this.focusNextField('homeAddress')}
                    onBlur={() => this.validateOnChange('locality', data.locality)}
                  />
                </View>
                {errors.locality ? (<Text style={styles.formError}>{errors.locality}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Dirección *</Text>
                <View style={[styles.formBox, styles.formBoxArea]}>
                  <TextInput
                    style={[styles.formInput, styles.formBoxArea]}
                    ref="homeAddress"
                    multiline={true}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    underlineColorAndroid="transparent"
                    value={data.homeAddress}
                    onChangeText={(value) => this.handleInputChange('homeAddress', value)}
                    onBlur={() => this.validateOnChange('homeAddress', data.homeAddress)}
                  />
                </View>
                {errors.homeAddress ? (<Text style={styles.formError}>{errors.homeAddress}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Dirección laboral *</Text>
                <View style={[styles.formBox, styles.formBoxArea]}>
                  <TextInput
                    style={[styles.formInput, styles.formBoxArea]}
                    ref="businessAddress"
                    multiline={true}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    underlineColorAndroid="transparent"
                    value={data.businessAddress}
                    onChangeText={(value) => this.handleInputChange('businessAddress', value)}
                    onBlur={() => this.validateOnChange('businessAddress', data.businessAddress)}
                  />
                </View>
                {errors.businessAddress ? (<Text style={styles.formError}>{errors.businessAddress}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Lugar de trabajo *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="workplace"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="done"
                    underlineColorAndroid="transparent"
                    value={data.workplace}
                    onChangeText={(value) => this.handleInputChange('workplace', value)}
                    onBlur={() => this.validateOnChange('workplace', data.workplace)}
                  />
                </View>
                {errors.workplace ? (<Text style={styles.formError}>{errors.workplace}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Ocupación (CAEDEC) *</Text>
                {
                  Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.formBox}
                      activeOpacity={1}
                      onPress={() => this.handleOpenPicker('activity', 'activities')}
                    >
                      <Text style={styles.formInput} numberOfLines={1}>{labels.activity}</Text>
                      <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.formBox}>
                      <Picker
                        style={styles.formPicker}
                        selectedValue={data.activity}
                        onValueChange={(itemValue, itemIndex) => this.handleInputChange('activity', itemValue)}
                      >
                        <Picker.Item value="" label="Seleccione..." />
                        {
                          options.activities.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                        }
                      </Picker>
                    </View>
                  )
                }
                {errors.activity ? (<Text style={styles.formError}>{errors.activity}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Descripción de actividad *</Text>
                <View style={[styles.formBox, styles.formBoxArea]}>
                  <TextInput
                    style={[styles.formInput, styles.formBoxArea]}
                    multiline={true}
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    underlineColorAndroid="transparent"
                    value={data.occupationDescription}
                    onChangeText={(value) => this.handleInputChange('occupationDescription', value)}
                    onBlur={() => this.validateOnChange('occupationDescription', data.occupationDescription)}
                  />
                </View>
                {errors.occupationDescription ? (<Text style={styles.formError}>{errors.occupationDescription}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Teléfono 1 *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="phoneNumberHome"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.phoneNumberHome}
                    onChangeText={(value) => this.handleInputChange('phoneNumberHome', value)}
                    onSubmitEditing={() => this.focusNextField('phoneNumberMobile')}
                    onBlur={() => this.validateOnChange('phoneNumberHome', data.phoneNumberHome)}
                  />
                </View>
                {errors.phoneNumberHome ? (<Text style={styles.formError}>{errors.phoneNumberHome}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Teléfono 2</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="phoneNumberMobile"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.phoneNumberMobile}
                    onChangeText={(value) => this.handleInputChange('phoneNumberMobile', value)}
                    onSubmitEditing={() => this.focusNextField('phoneNumberOffice')}
                    onBlur={() => this.validateOnChange('phoneNumberMobile', data.phoneNumberMobile)}
                  />
                </View>
                {errors.phoneNumberMobile ? (<Text style={styles.formError}>{errors.phoneNumberMobile}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Teléfono oficina</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="phoneNumberOffice"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.phoneNumberOffice}
                    onChangeText={(value) => this.handleInputChange('phoneNumberOffice', value)}
                    onSubmitEditing={() => this.focusNextField('email')}
                    onBlur={() => this.validateOnChange('phoneNumberOffice', data.phoneNumberOffice)}
                  />
                </View>
                {errors.phoneNumberOffice ? (<Text style={styles.formError}>{errors.phoneNumberOffice}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Correo electrónico</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.email}
                    onChangeText={(value) => this.handleInputChange('email', value)}
                    onSubmitEditing={() => this.focusNextField('weight')}
                    onBlur={() => this.validateOnChange('email', data.email)}
                  />
                </View>
                {errors.email ? (<Text style={styles.formError}>{errors.email}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Peso *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="weight"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.weight}
                    onChangeText={(value) => this.handleInputChange('weight', value)}
                    onSubmitEditing={() => this.focusNextField('height')}
                    onBlur={() => this.validateOnChange('weight', data.weight)}
                  />
                </View>
                {errors.weight ? (<Text style={styles.formError}>{errors.weight}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Estatura *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    ref="height"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={$ColorFormText}
                    returnKeyType="done"
                    underlineColorAndroid="transparent"
                    value={data.height}
                    onChangeText={(value) => this.handleInputChange('height', value)}
                    onSubmitEditing={() => this.handleStore()}
                    onBlur={() => this.validateOnChange('height', data.height)}
                  />
                </View>
                {errors.height ? (<Text style={styles.formError}>{errors.height}</Text>) : null}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.btnSuccessLarge, { marginTop: 120 }]}
              activeOpacity={0.8}
              onPress={() => this.handleStore()}
            >
              <Text style={styles.btnSuccessLargeText}>Registrar Cliente</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {
          Platform.OS === 'ios' && (
            <PickerView
              ref={(pickerView) => { this.pickerView = pickerView; }}
              handleValue={this.handleValuePicker}
            />
          )
        }

        <DatePickerView
          ref={(_datePicker) => { this._datePicker = _datePicker; }}
          handleValue={this.handleDatePickerValue}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    headerRef: state.issuance.headerRef,
  }
};

export default connect(mapStateToProps)(ClientView);