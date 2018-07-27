import React, { Component, Fragment } from 'react';
import {
  Picker,
  Platform,
  StatusBar,
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
import validation from '@validation';
import { getDetails } from './DetailView';
import PickerView from './../../../commons/PickerView';
import LoadingView from './../../../commons/Loading';
import styles, { $ColorDanger, $ColorFormText } from './../../../assets/css/styles';

class DataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        coverage: '',
        amountRequested: '',
        currency: '',
        term: '',
        termType: '',
        creditProduct: '',
      },
      labels: {
        coverage: 'Seleccione...',
        currency: 'Seleccione...',
        termType: 'Seleccione...',
        creditProduct: 'Seleccione...',
      },
      options: {
        coverages: [],
        currencies: [],
        termTypes: [],
        creditProducts: [],
      },
      errors: {},
      isLoading: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Datos del Préstamo',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left',
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
      options: {
        ...prevState.options,
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
    }));
  }

  handleLoading = (value) => {
    this.setState({ isLoading: value });
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

  handleStore = () => {
    this.props.navigation.navigate('deDetail');
    return false;
    const { data } = this.state;
    let errors = {};
    let numErrors = 0;

    for (const key in data) {
      errors[key] = validation(key, data[key], 'deDataConstraints');

      if (errors[key]) {
        numErrors++;
      }
    }

    this.setState({ errors });
    
    if (numErrors > 0) {
      return false;
    }

    this.handleLoading(true);

    const user = auth.currentUser;
    const date = moment();

    db.collection('deHeaders').add({
      userRef: user.uid,
      type: 'Q',
      issueNumber: 0,
      prefix: 'DE',
      issued: false,
      dateIssue: null,
      createdAt: date.toDate(),
      updatedAt: date.toDate(),
      ...data,
      amountRequested: numeral(data.amountRequested).value(),
      term: numeral(data.term).value(),
    })
    .then(docRef => {
      this.handleLoading(false);

      this.props.actions.setHeaderRef(docRef.id);
      
      getDetails(docRef.id).then(details => {
        this.props.actions.setDetailList(details);
      });

      this.props.navigation.navigate('deDetail');
    })
    .catch(error => {
      this.handleLoading(false);
    });
  }

  render() {
    const { data, labels, options, errors, isLoading } = this.state;

    return (
      <Fragment>
        <LoadingView visible={isLoading} />

        <StatusBar backgroundColor="rgba(198,201,202, .5)" barStyle="dark-content" />

        <View style={styles.bg}>
          <View style={[styles.container, { paddingTop: 10 }]}>
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tipo de Cobertura *</Text>
                {
                  Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.formBox}
                      activeOpacity={1}
                      onPress={() => this.handleOpenPicker('coverage', 'coverages')}
                    >
                      <Text style={styles.formInput} numberOfLines={1}>{labels.coverage}</Text>
                      <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.formBox}>
                      <Picker
                        style={styles.formPicker}
                        selectedValue={data.coverage}
                        onValueChange={(itemValue, itemIndex) => this.handleInputChange('coverage', itemValue)}
                      >
                        <Picker.Item value="" label="Seleccione..." />
                        {
                          options.coverages.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                        }
                      </Picker>
                    </View>
                  )
                }
                {errors.coverage ? (<Text style={styles.formError}>{errors.coverage}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Monto Solicitado *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.amountRequested}
                    onChangeText={(value) => this.handleInputChange('amountRequested', value)}
                  />
                </View>
                {errors.amountRequested ? (<Text style={styles.formError}>{errors.amountRequested}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Moneda *</Text>
                {
                  Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.formBox}
                      activeOpacity={1}
                      onPress={() => this.handleOpenPicker('currency', 'currencies')}
                    >
                      <Text style={styles.formInput} numberOfLines={1}>{labels.currency}</Text>
                      <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.formBox}>
                      <Picker
                        style={styles.formPicker}
                        selectedValue={data.currency}
                        onValueChange={(itemValue, itemIndex) => this.handleInputChange('currency', itemValue)}
                      >
                        <Picker.Item value="" label="Seleccione..." />
                        {
                          options.currencies.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                        }
                      </Picker>
                    </View>
                  )
                }
                {errors.currency ? (<Text style={styles.formError}>{errors.currency}</Text>) : null}
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Plazo *</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    value={data.term}
                    onChangeText={(value) => this.handleInputChange('term', value)}
                  />
                </View>
                {errors.term ? (<Text style={styles.formError}>{errors.term}</Text>) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tipo de Plazo *</Text>
                {
                  Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.formBox}
                      activeOpacity={1}
                      onPress={() => this.handleOpenPicker('termType', 'termTypes')}
                    >
                      <Text style={styles.formInput} numberOfLines={1}>{labels.termType}</Text>
                      <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.formBox}>
                      <Picker
                        style={styles.formPicker}
                        selectedValue={data.termType}
                        onValueChange={(itemValue, itemIndex) => this.handleInputChange('termType', itemValue)}
                      >
                        <Picker.Item value="" label="Seleccione..." />
                        {
                          options.termTypes.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                        }
                      </Picker>
                    </View>
                  )
                }
                {errors.termType ? (<Text style={styles.formError}>{errors.termType}</Text>) : null}
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Producto *</Text>
                {
                  Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.formBox}
                      activeOpacity={1}
                      onPress={() => this.handleOpenPicker('creditProduct', 'creditProducts')}
                    >
                      <Text style={styles.formInput} numberOfLines={1}>{labels.creditProduct}</Text>
                      <Icon name="md-arrow-dropdown" size={20} color={$ColorFormText} style={styles.formIcon} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.formBox}>
                      <Picker
                        style={styles.formPicker}
                        selectedValue={data.creditProduct}
                        onValueChange={(itemValue, itemIndex) => this.handleInputChange('creditProduct', itemValue)}
                      >
                        <Picker.Item value="" label="Seleccione..." />
                        {
                          options.creditProducts.map(item => <Picker.Item value={item.value} label={item.label} key={item.value} />)
                        }
                      </Picker>
                    </View>
                  )
                }
                {errors.creditProduct ? (<Text style={styles.formError}>{errors.creditProduct}</Text>) : null}
              </View>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.btnSuccessLarge}
            activeOpacity={0.8}
            onPress={() => this.handleStore()}
          >
            <Text style={styles.btnSuccessLargeText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
        {
          Platform.OS === 'ios' && (
            <PickerView
              ref={(pickerView) => { this.pickerView = pickerView; }}
              handleValue={this.handleValuePicker}
            />
          )
        }
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