import React, { Component } from 'react';
import {
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

import PickerView from './../../../commons/PickerView';
import DatePickerView from './../../../commons/DatePickerView';
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
        extensionLabel: 'Extensión',
        extensions: [],
        birthdate: null,
        birthdateText: 'Fecha de Nacimiento',
        placeResidence: '',
        locality: '',
        homeAddress: '',
        businessAddress: '',
        workplace: '',
        activity: '',
        activityLabel: 'Ocupación (CAEDEC)',
        activities: [],
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
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Cliente',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left'
    },
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
      data: {
        ...prevState.data,
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
    const { data } = this.state;

    this.pickerView.handleOpen(field, data[field], data[lists]);
  }

  handleValuePicker = (field, value, lists) => {
    const fieldLabel = field + 'Label';
    const selectedItem = lists.filter(l => l.value == value)[0];

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: selectedItem.value,
        [fieldLabel]: selectedItem.label,
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
    const fieldText = field + 'Text';

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: value,
        [fieldText]: moment(value).format('DD / MM / YYYY'),
      }
    }));
  }

  render() {
    const { data, isLoading } = this.state;

    return (
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
              />
            </View>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Apellido Paterno"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.lastName}
                onChangeText={(value) => this.handleInputChange('lastName', value)}
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Apellido Materno"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.motherLastName}
                onChangeText={(value) => this.handleInputChange('motherLastName', value)}
              />
            </View>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Apellido de Casada"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.marriedName}
                onChangeText={(value) => this.handleInputChange('marriedName', value)}
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Doc. de Identidad"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.dni}
                onChangeText={(value) => this.handleInputChange('dni', value)}
              />
            </View>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="default"
                autoCapitalize="characters"
                autoCorrect={false}
                placeholder="Complemento"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
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
                  <Text style={styles.formInput} numberOfLines={1}>{data.extensionLabel}</Text>
                  <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                </TouchableOpacity>
              ) : (
                <View style={styles.formBox}>
                  <Picker
                    style={styles.formPicker}
                    selectedValue={data.extension}
                    onValueChange={(itemValue, itemIndex) => this.handleInputChange('extension', itemValue)}
                  >
                    <Picker.Item value="" label={data.extensionLabel} />
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
                {data.birthdateText}
              </Text>
              <Icon name="ios-calendar" size={30} color={$ColorFormText} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={false}
                placeholder="Lugar de Nacimiento"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.placeResidence}
                onChangeText={(value) => this.handleInputChange('placeResidence', value)}
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={false}
                placeholder="Localidad"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.locality}
                onChangeText={(value) => this.handleInputChange('locality', value)}
              />
            </View>
          </View>
          
          <View style={[styles.formGroup, styles.formBoxArea]}>
            <View style={[styles.formBox, styles.formBoxArea]}>
              <TextInput
                style={[styles.formInput, styles.formBoxArea]}
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
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={false}
                placeholder="Lugar de trabajo"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
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
                  <Text style={styles.formInput} numberOfLines={1}>{data.activityLabel}</Text>
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
                    <Picker.Item value="" label={data.activityLabel} />
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
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Teléfono 1"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.phoneNumberHome}
                onChangeText={(value) => this.handleInputChange('phoneNumberHome', value)}
              />
            </View>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Teléfono 2"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.phoneNumberMobile}
                onChangeText={(value) => this.handleInputChange('phoneNumberMobile', value)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Teléfono oficina"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.phoneNumberOffice}
                onChangeText={(value) => this.handleInputChange('phoneNumberOffice', value)}
              />
            </View>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Correo electrónico"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.email}
                onChangeText={(value) => this.handleInputChange('email', value)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Peso"
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.weight}
                onChangeText={(value) => this.handleInputChange('weight', value)}
              />
            </View>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Estatura"
                placeholderTextColor={$ColorFormText}
                returnKeyType="done"
                underlineColorAndroid="transparent"
                value={data.height}
                onChangeText={(value) => this.handleInputChange('height', value)}
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
    )
  }
}