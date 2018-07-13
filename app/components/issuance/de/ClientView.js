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
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { db } from './../../../utils/firebase';
import PickerView from './../../../commons/PickerView';
import DatePickerView from './../../../commons/DatePickerView';
import LoadingView from './../../../commons/Loading';
import styles, { $ColorFormText } from './../../../assets/css/styles';

export default class ClientView extends Component {
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
      isLoading: false,
    };

    this.extensions = [];
    this.activities = [],

    this.labels = {
      extensionLabel: 'Extensión',
      activityLabel: 'Ocupación (CAEDEC)',
    };

    this.texts = {
      birthdateText: 'Fecha de Nacimiento',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Cliente',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left'
    },
    headerBackTitle: null,
  });

  componentDidMount = () => {
    this.extensions = [
      { 'value': 'LP', 'label': 'La Paz', },
      { 'value': 'OR', 'label': 'Oruro', },
      { 'value': 'PO', 'label': 'Potosí', },
    ];
    
    this.activities = [
      { 'value': 1, 'label': 'OCUPACIONES DE DIRECCIÓN PÚBLICA O PRIVADA.', },
      { 'value': 1126, 'label': 'CULTIVO DE FLORES Y PLANTAS ORNAMENTALES', },
      { 'value': 14290, 'label': 'EXPLOTACION DE OTRAS MINAS Y CANTERAS NCP', },
    ];
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
    const { data } = this.state;

    this.pickerView.handleOpen(field, data[field], this[lists]);
  }

  handleValuePicker = (field, value, lists) => {
    const fieldLabel = field + 'Label';
    const selectedItem = lists.filter(l => l.value == value)[0];

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: selectedItem.value,
      }
    }));

    this.labels[fieldLabel] = selectedItem.label;
  }

  handleDatePicker = (field) => {
    let date = moment().toDate();

    if (this.state.data[field]) {
      date = this.state.data[field];
    }

    this._datePicker._handleOpen(field, date);
  }

  handleDatePickerValue = (field, value) => {
    const fieldText = field + 'Text';

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: value,
      }
    }));

    this.texts[fieldText] = moment(value).format('DD/MM/YYYY');
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

    db.collection('deDetails')
      .add({
        headerRef: '',
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
    const { data, isLoading } = this.state;
    const { labels, texts } = this;

    return (
      <Fragment>
        <LoadingView visible={isLoading} />

        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white', }}>
          <ScrollView
            contentContainerStyle={[styles.insuranceBox, { paddingBottom: 0 }]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Nombres"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.firstName}
                  onChangeText={(value) => this.handleInputChange('firstName', value)}
                  onSubmitEditing={() => this.focusNextField('lastName')}
                />
              </View>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="lastName"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Apellido Paterno"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.lastName}
                  onChangeText={(value) => this.handleInputChange('lastName', value)}
                  onSubmitEditing={() => this.focusNextField('motherLastName')}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="motherLastName"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Apellido Materno"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.motherLastName}
                  onChangeText={(value) => this.handleInputChange('motherLastName', value)}
                  onSubmitEditing={() => this.focusNextField('marriedName')}
                />
              </View>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="marriedName"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Apellido de Casada"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.marriedName}
                  onChangeText={(value) => this.handleInputChange('marriedName', value)}
                  onSubmitEditing={() => this.focusNextField('dni')}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="dni"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Doc. de Identidad"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.dni}
                  onChangeText={(value) => this.handleInputChange('dni', value)}
                  onSubmitEditing={() => this.focusNextField('complement')}
                />
              </View>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="complement"
                  keyboardType="default"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  placeholder="Complemento"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="done"
                  underlineColorAndroid="transparent"
                  value={data.complement}
                  onChangeText={(value) => this.handleInputChange('complement', value)}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              {
                Platform.OS === 'ios' ? (
                  <TouchableOpacity
                    style={styles.formBox}
                    activeOpacity={1}
                    onPress={() => this.handleOpenPicker('extension', 'extensions')}
                  >
                    <Text style={styles.formInput} numberOfLines={1}>{labels.extensionLabel}</Text>
                    <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.formBox}>
                    <Picker
                      style={styles.formPicker}
                      selectedValue={data.extension}
                      onValueChange={(itemValue, itemIndex) => this.handleInputChange('extension', itemValue)}
                    >
                      <Picker.Item value="" label={labels.extensionLabel} />
                      {
                        data.extensions.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                      }
                    </Picker>
                  </View>
                )
              }

              <TouchableOpacity
                style={styles.formBox}
                activeOpacity={0.8}
                onPress={() => this.handleDatePicker('birthdate')}
              >
                <Text style={styles.formInput}>
                  {texts.birthdateText}
                </Text>
                <Icon name="ios-calendar" size={30} color={$ColorFormText} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Lugar de Nacimiento"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.placeResidence}
                  onChangeText={(value) => this.handleInputChange('placeResidence', value)}
                  onSubmitEditing={() => this.focusNextField('locality')}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="locality"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Localidad"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.locality}
                  onChangeText={(value) => this.handleInputChange('locality', value)}
                  onSubmitEditing={() => this.focusNextField('homeAddress')}
                />
              </View>
            </View>
            
            <View style={[styles.formGroup, styles.formBoxArea]}>
              <View style={[styles.formBox, styles.formBoxArea]}>
                <TextInput
                  style={[styles.formInput, styles.formBoxArea]}
                  ref="homeAddress"
                  multiline={true}
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  placeholder="Dirección"
                  placeholderTextColor={$ColorFormText}
                  underlineColorAndroid="transparent"
                  value={data.homeAddress}
                  onChangeText={(value) => this.handleInputChange('homeAddress', value)}
                />
              </View>
            </View>
            
            <View style={[styles.formGroup, styles.formBoxArea]}>
              <View style={[styles.formBox, styles.formBoxArea]}>
                <TextInput
                  style={[styles.formInput, styles.formBoxArea]}
                  ref="businessAddress"
                  multiline={true}
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  placeholder="Dirección laboral"
                  placeholderTextColor={$ColorFormText}
                  underlineColorAndroid="transparent"
                  value={data.businessAddress}
                  onChangeText={(value) => this.handleInputChange('businessAddress', value)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="workplace"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  placeholder="Lugar de trabajo"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="done"
                  underlineColorAndroid="transparent"
                  value={data.workplace}
                  onChangeText={(value) => this.handleInputChange('workplace', value)}
                />
              </View>
            </View>

            {
              Platform.OS === 'ios' ? (
                <TouchableOpacity
                  style={styles.formGroup}
                  activeOpacity={1}
                  onPress={() => this.handleOpenPicker('activity', 'activities')}
                >
                  <View style={styles.formBox}>
                    <Text style={styles.formInput} numberOfLines={1}>{labels.activityLabel}</Text>
                    <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.formGroup}>
                  <View style={styles.formBox}>
                    <Picker
                      style={styles.formPicker}
                      selectedValue={data.activity}
                      onValueChange={(itemValue, itemIndex) => this.handleInputChange('activity', itemValue)}
                    >
                      <Picker.Item value="" label={labels.activityLabel} />
                      {
                        data.activities.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                      }
                    </Picker>
                  </View>
                </View>
              )
            }

            <View style={[styles.formGroup, styles.formBoxArea]}>
              <View style={[styles.formBox, styles.formBoxArea]}>
                <TextInput
                  style={[styles.formInput, styles.formBoxArea]}
                  multiline={true}
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  placeholder="Descripción de actividad"
                  placeholderTextColor={$ColorFormText}
                  underlineColorAndroid="transparent"
                  value={data.occupationDescription}
                  onChangeText={(value) => this.handleInputChange('occupationDescription', value)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="phoneNumberHome"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Teléfono 1"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.phoneNumberHome}
                  onChangeText={(value) => this.handleInputChange('phoneNumberHome', value)}
                  onSubmitEditing={() => this.focusNextField('phoneNumberMobile')}
                />
              </View>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="phoneNumberMobile"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Teléfono 2"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.phoneNumberMobile}
                  onChangeText={(value) => this.handleInputChange('phoneNumberMobile', value)}
                  onSubmitEditing={() => this.focusNextField('phoneNumberOffice')}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="phoneNumberOffice"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Teléfono oficina"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.phoneNumberOffice}
                  onChangeText={(value) => this.handleInputChange('phoneNumberOffice', value)}
                  onSubmitEditing={() => this.focusNextField('email')}
                />
              </View>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Correo electrónico"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.email}
                  onChangeText={(value) => this.handleInputChange('email', value)}
                  onSubmitEditing={() => this.focusNextField('weight')}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="weight"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Peso"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  value={data.weight}
                  onChangeText={(value) => this.handleInputChange('weight', value)}
                  onSubmitEditing={() => this.focusNextField('height')}
                />
              </View>
              <View style={styles.formBox}>
                <TextInput
                  style={styles.formInput}
                  ref="height"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Estatura"
                  placeholderTextColor={$ColorFormText}
                  returnKeyType="done"
                  underlineColorAndroid="transparent"
                  value={data.height}
                  onChangeText={(value) => this.handleInputChange('height', value)}
                  onSubmitEditing={() => this.handleStore()}
                />
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