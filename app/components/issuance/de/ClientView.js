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
import moment from 'moment';

import { db } from './../../../utils/firebase';
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
      isLoading: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Cliente',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left',
      ...Platform.select({
        android: {
          marginLeft: 55,
        }
      })
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
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: value,
      },
      labels: {
        ...prevState.labels,
        [field]: moment(value).format('DD/MM/YYYY'),
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
    const { data, labels, options, isLoading } = this.state;

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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
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
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.btnSuccessLarge, { marginTop: 100 }]}
              activeOpacity={0.8}
              onPress={() => this.handleStore()}
            >
              <Text style={styles.btnSuccessLargeText}>Registrar Cliente</Text>
            </TouchableOpacity>
          </ScrollView>
          
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

        </View>
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