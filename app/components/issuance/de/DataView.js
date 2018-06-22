import React, { Component, Fragment } from 'react';
import {
  Picker,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import numeral from 'numeral';

import * as actions from './../../../actions/home';
import { auth, db } from './../../../utils/firebase';

import PickerView from './../../../commons/PickerView';
import LoadingOne from './../../../commons/Loading';

import styles, { $ColorDanger, $ColorFormText } from './../../../assets/css/styles';

class DataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        coverage: '',
        coverageLabel: 'Tipo de Cobertura',
        coverages: [],
        amountRequested: '',
        amountRequestedLabel: 'Monto Solicitado',
        currency: '',
        currencyLabel: 'Moneda',
        currencies: [],
        term: '',
        termLabel: 'Plazo',
        termType: '',
        termTypeLabel: 'Tipo de Plazo',
        termTypes: [],
        creditProduct: '',
        creditProductLabel: 'Producto',
        creditProducts: [],
      },
      isLoading: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Préstamo',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left'
    },
  });

  componentDidMount = () => {
    const coverages = [
      { 'value': 1, 'label': 'Individual', },
      { 'value': 2, 'label': 'Mancomunado (Afiliación al 100% para cada codeudor)', },
      { 'value': 4, 'label': 'Codeudor (Afiliación en porcentajes para cada codeudor)', },
    ];

    const currencies = [
      { 'value': 'BS', 'label': 'Bolivianos', },
      { 'value': 'USD', 'label': 'Dolares', },
    ];

    const termTypes = [
      { 'value': "Y", 'label': "Años", },
      { 'value': "M", 'label': "Meses", },
      { 'value': "W", 'label': "Semanas", },
      { 'value': "D", 'label': "Días", },
    ];

    const creditProducts = [
      { 'value': 1, 'label': "Consumo", },
      { 'value': 2, 'label': "Comercial", },
      { 'value': 3, 'label': "Hipotecario de Vivienda, Vivienda Social o Automotor", },
      { 'value': 4, 'label': "Tarjetas", },
      { 'value': 5, 'label': "Otros", },
      { 'value': 7, 'label': "Asalariado 7x5", },
      { 'value': 8, 'label': "Línea Licitada", },
      { 'value': 9, 'label': "Línea no Licitada", },
    ];

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        coverages,
        currencies,
        termTypes,
        creditProducts
      }
    }));
  }

  handleInputChange = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      }
    }))
  }

  handleLoading = (value) => {
    this.setState({ isLoading: value });
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

  handleStore = () => {
    this.handleLoading(true);

    const { coverage, amountRequested, currency, term, termType, creditProduct } = this.state.data;
    const user = auth.currentUser;
    const date = moment();

    db.collection('deHeaders').add({
      userRef: user.uid,
      type: 'Q',
      issueNumber: 0,
      prefix: 'DE',
      coverage,
      creditProduct,
      amountRequested: numeral(amountRequested).value(),
      currency,
      term: numeral(term).value(),
      termType,
      issued: false,
      dateIssue: null,
      createdAt: date.toDate(),
      updatedAt: date.toDate(),
    })
    .then(docRef => {
      this.handleLoading(false);

      this.props.actions.setHeaderRef(docRef.id);

      this.props.navigation.navigate('Detail');
    })
    .catch(error => {
      this.handleLoading(false);
      // console.warn("Error adding document: ", error);
    });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <Fragment>
        <LoadingOne visible={isLoading} />

        <View style={[styles.container, { paddingTop: 10 }]}>
          {
            Platform.OS === 'ios' ? (
              <TouchableOpacity
                style={styles.formGroup}
                activeOpacity={1}
                onPress={() => this.handleOpenPicker('coverage', 'coverages')}
              >
                <View style={styles.formBox}>
                  <Text style={styles.formInput} numberOfLines={1}>{data.coverageLabel}</Text>
                  <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.formGroup}>
                <View style={styles.formBox}>
                  <Picker
                    style={styles.formPicker}
                    selectedValue={data.coverage}
                    onValueChange={(itemValue, itemIndex) => this.handleInputChange('coverage', itemValue)}
                  >
                    <Picker.Item value="" label={data.coverageLabel} />
                    {
                      data.coverages.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                    }
                  </Picker>
                </View>
              </View>
            )
          }

          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={data.amountRequestedLabel}
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.amountRequested}
                onChangeText={(value) => this.handleInputChange('amountRequested', value)}
              />
            </View>
            {
              Platform.OS === 'ios' ? (
                <TouchableOpacity
                  style={styles.formBox}
                  activeOpacity={1}
                  onPress={() => this.handleOpenPicker('currency', 'currencies')}
                >
                  <Text style={styles.formInput} numberOfLines={1}>{data.currencyLabel}</Text>
                  <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                </TouchableOpacity>
              ) : (
                <View style={styles.formBox}>
                  <Picker
                    style={styles.formPicker}
                    selectedValue={data.currency}
                    onValueChange={(itemValue, itemIndex) => this.handleInputChange('currency', itemValue)}
                  >
                    <Picker.Item value="" label={data.currencyLabel} />
                    {
                      data.currencies.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                    }
                  </Picker>
                </View>
              )
            }
          </View>
          
          <View style={styles.formGroup}>
            <View style={styles.formBox}>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={data.termLabel}
                placeholderTextColor={$ColorFormText}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                value={data.term}
                onChangeText={(value) => this.handleInputChange('term', value)}
              />
            </View>
            {
              Platform.OS === 'ios' ? (
                <TouchableOpacity
                  style={styles.formBox}
                  activeOpacity={1}
                  onPress={() => this.handleOpenPicker('termType', 'termTypes')}
                >
                  <Text style={styles.formInput} numberOfLines={1}>{data.termTypeLabel}</Text>
                  <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                </TouchableOpacity>
              ) : (
                <View style={styles.formBox}>
                  <Picker
                    style={styles.formPicker}
                    selectedValue={data.termType}
                    onValueChange={(itemValue, itemIndex) => this.handleInputChange('termType', itemValue)}
                  >
                    <Picker.Item value="" label={data.termTypeLabel} />
                    {
                      data.termTypes.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                    }
                  </Picker>
                </View>
              )
            }
          </View>

          {
            Platform.OS === 'ios' ? (
              <TouchableOpacity
                style={styles.formGroup}
                activeOpacity={1}
                onPress={() => this.handleOpenPicker('creditProduct', 'creditProducts')}
              >
                <View style={styles.formBox}>
                  <Text style={styles.formInput} numberOfLines={1}>{data.creditProductLabel}</Text>
                  <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.formGroup}>
                <View style={styles.formBox}>
                  <Picker
                    style={styles.formPicker}
                    selectedValue={data.creditProduct}
                    onValueChange={(itemValue, itemIndex) => this.handleInputChange('creditProduct', itemValue)}
                  >
                    <Picker.Item value="" label={data.creditProductLabel} />
                    {
                      data.creditProducts.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                    }
                  </Picker>
                </View>
              </View>
            )
          }

          {
            Platform.OS === 'ios' && (
              <PickerView
                ref={(pickerView) => { this.pickerView = pickerView; }}
                handleValue={this.handleValuePicker}
              />
            )
          }
        </View>

        <TouchableOpacity
          style={styles.btnSuccessLarge}
          activeOpacity={0.8}
          onPress={() => this.handleStore()}
        >
          <Text style={styles.btnSuccessLargeText}>Siguiente</Text>
        </TouchableOpacity>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    headerRef: state.issuance.headerRef,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView);