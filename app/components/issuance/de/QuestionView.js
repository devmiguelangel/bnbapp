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
      questions: [],
      observation: '',
      errors: [],
      isLoading: false,
      tendered: true,
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
    const questions = [
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
    ];

    this.setState({ questions });
  }

  toggleSwitch = (value, id) => {
    const { questions } = this.state;
    questions.map(q => {
      if (q.id === id) {
        q.response = value;
      }

      return q;
    });

    const errors = this.validateQuestions(questions);
    
    this.setState({ questions });
  }

  handleInputChange = (name, value) => {
    const { questions } = this.state;
    const errors = this.validateQuestions(questions);

    this.setState({
      [name]: value,
      errors,
    });
  }

  validateQuestions = (questions) => {
    const errors = [];

    questions.forEach(q => {
      if (q.response != q.expected) {
        errors.push(q.order);
      }
    });

    return errors;
  }

  handleStore = () => {
    const { questions, observation, tendered } = this.state;
    const errors = this.validateQuestions(questions);

    if (tendered) {
      
    } else if (errors.length > 0 && !observation) {
      this.setState({ errors });

      return false;
    }

    this.setState({ isLoading: true });

    const { headerRef, navigation } = this.props;
    const detailId = navigation.getParam('detailId');
    const data = moment();

    db.collection('deDetails').doc(detailId)
      .update({
        responses: questions,
        responseObservation: observation,
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
    const { questions, observation, errors, tendered, isLoading } = this.state;

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
                questions.map((question, index) => 
                  <Fragment key={index}>
                    <View style={styles.questionBox}>
                      <Text style={styles.questionNumber}>{question.order}.</Text>
                      <Text style={styles.questionText}>{question.question}</Text>
                      <Switch
                        value={question.response}
                        onValueChange={(value) => this.toggleSwitch(value, question.id)}
                      />
                    </View>
                    {
                      tendered && (
                        <View style={styles.formContainer}>
                          <View style={[styles.formGroup, styles.questionObservationBox]}>
                            <TextInput
                              style={styles.questionObservationText}
                              placeholder="En caso que la respuesta sea afirmativa, favor especificar"
                              placeholderTextColor={$ColorFormText}
                            />
                          </View>
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
                          value={observation}
                          onChangeText={(value) => this.handleInputChange('observation', value)}
                        />
                      </View>
                      {
                        errors.length > 0 && !observation ? (
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