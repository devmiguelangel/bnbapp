import React, { Component, Fragment } from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from './../../../actions/home';
import { db } from './../../../utils/firebase';
import { getDetails } from './DetailView';
import LoadingView from './../../../commons/Loading';
import styles, { $ColorFormText } from './../../../assets/css/styles';

class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {
        responses: [],
        observation: '',
      },
      errors: [],
      isLoading: false,
      tendered: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Cuestionario de Salud',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left',
    },
  });

  componentDidMount = () => {
    const questions = {
      responses: [
        {
          id: 1,
          order: 1,
          expected: true,
          response: false,
          question: '¿Se encuentra usted actualmente sano?',
          observation: '',
        },
        {
          id: 2,
          order: 2,
          expected: false,
          response: false,
          question: '¿Tiene alguna enfermedad diagnosticada?. ¿Cuál?',
          observation: '',
        },
        {
          id: 3,
          order: 3,
          expected: false,
          response: false,
          question: '¿Tiene SIDA o es portador de HIV?',
          observation: '',
        },
        {
          id: 4,
          order: 4,
          expected: false,
          response: false,
          question: '¿Practica algún deporte a nivel profesional o considerado de alto riesgo? (Alpinismo, automovilismo, etc.)',
          observation: '',
        },
        {
          id: 5,
          order: 5,
          expected: false,
          response: false,
          question: '¿Ha recibido tratamiento por más de 30 días o le han recomendado exámenes médicos?',
          observation: '',
        },
        {
          id: 6,
          order: 6,
          expected: false,
          response: false,
          question: '¿Le han recetado medicamentos para su consumo por un lapso mayor a 30 días?',
          observation: '',
        },
        {
          id: 7,
          order: 7,
          expected: false,
          response: false,
          question: '¿Se ha sometido a intervenciones quirúrgicas ó ha sido hospitalizado por algún motivo?',
          observation: '',
        },
        {
          id: 8,
          order: 8,
          expected: false,
          response: false,
          question: '¿Realiza viajes en algún medio de transporte aéreo no comercial?',
          observation: '',
        },
      ],
      observation: '',
    };

    this.setState({ questions });
  }

  toggleSwitch = (value, id) => {
    const { questions } = this.state;
    questions.responses.map(res => {
      if (res.id === id) {
        res.response = value;
      }

      return res;
    });

    const errors = this.validateQuestions(questions);
    
    this.setState({
      questions,
      errors,
    });
  }

  handleInputChange = (name, value) => {
    const { questions, tendered } = this.state;
    const errors = this.validateQuestions(questions);
    
    if (tendered) {
      questions.responses.map(res => {
        if (res.id === name) {
          res.observation = value
        }

        return res;
      });
    } else {
      questions[name] = value;
    }
    
    this.setState({
      questions,
      errors,
    });
  }

  validateQuestions = (questions) => {
    const errors = [];

    questions.responses.forEach(res => {
      if (res.response != res.expected) {
        errors.push(res.id);
      }
    });

    return errors;
  }

  handleStore = () => {
    const { questions, tendered } = this.state;
    const errors = this.validateQuestions(questions);
    
    this.setState({ errors });

    if ((tendered && questions.responses.filter(res => errors.includes(res.id) && /^\s*$/.test(res.observation)).length > 0) 
      || (!tendered && errors.length > 0 && /^\s*$/.test(questions.observation))) {
      return false;
    }

    this.setState({ isLoading: true });

    const { headerRef, navigation } = this.props;
    const detailId = navigation.getParam('detailId');
    const data = moment();

    db.collection('deDetails').doc(detailId)
      .update({
        questions: questions,
      })
      .then(() => {
        this.setState({ isLoading: false });
        
        getDetails(headerRef).then(details => {
          this.props.actions.setDetailList(details);
        });

        navigation.navigate('deDetail');
      })
      .catch(error => {
        Alert.alert(
          'BNB Seguros',
          'Error updating document',
          [
            { text: 'OK', onPress: () => this.setState({ isLoading: false }) },
          ],
          { cancelable: false }
        );
      });
  }

  render() {
    const { questions, errors, tendered, isLoading } = this.state;

    return (
      <Fragment>
        <LoadingView visible={isLoading} />

        <View style={styles.bg}>
          <ScrollView
            contentContainerStyle={[styles.insuranceBox, { paddingBottom: 0, }]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.container, { alignSelf: 'stretch', paddingBottom: 300, }]}>
              {
                questions.responses.map((res, index) => 
                  <Fragment key={index}>
                    <View style={styles.questionBox}>
                      <Text style={styles.questionNumber}>{res.order}.</Text>
                      <Text style={styles.questionText}>{res.question}</Text>
                      <Switch
                        value={res.response}
                        onValueChange={(value) => this.toggleSwitch(value, res.id)}
                      />
                    </View>
                    {
                      tendered && (
                        <View style={[styles.formContainer, { flexDirection: 'column', }]}>
                          <View style={[styles.formGroup, styles.questionObservationBox]}>
                            <TextInput
                              style={styles.questionObservationText}
                              placeholder="En caso que la respuesta sea afirmativa, favor especificar"
                              placeholderTextColor="#78909C"
                              value={res.observation}
                              onChangeText={(value) => this.handleInputChange(res.id, value)}
                            />
                          </View>
                          {
                            errors.includes(res.id) && /^\s*$/.test(res.observation) ? (
                              <Text style={styles.formError}>Especificación requerida</Text>
                            ) : null
                          }
                        </View>
                      )
                    }
                  </Fragment>
                )
              }

              {
                !tendered && (
                  <View style={styles.formContainer}>
                    <View style={styles.formGroup}>
                      <View style={[styles.formBox, styles.formBoxArea]}>
                        <TextInput
                          style={[styles.formInput, styles.formBoxArea]}
                          multiline={true}
                          keyboardType="default"
                          autoCapitalize="sentences"
                          placeholder="Observación"
                          placeholderTextColor="#CFD8DC"
                          underlineColorAndroid="transparent"
                          value={questions.observation}
                          onChangeText={(value) => this.handleInputChange('observation', value)}
                        />
                      </View>
                      {
                        errors.length > 0 && /^\s*$/.test(questions.observation) ? (
                          <Text style={styles.formError}>
                            Describa en detalle el motivo de sus respuestas que puedan indicar complicaciones de salud.
                          </Text>
                        ) : null
                      }
                    </View>
                  </View>
                )
              }
            </View>
          </ScrollView>
          
          <TouchableOpacity
            style={styles.btnSuccessLarge}
            activeOpacity={0.8}
            onPress={() => this.handleStore()}
          >
            <Text style={styles.btnSuccessLargeText}>Registrar Cuestionario de Salud</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);