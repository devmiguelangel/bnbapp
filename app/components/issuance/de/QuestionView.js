import React, { Component, Fragment } from 'react';
import {
  Alert,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';

import { db } from './../../../utils/firebase';
import LoadingView from './../../../commons/Loading';
import styles from './../../../assets/css/styles';

export default class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoading: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Cuestionario de Salud',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left'
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
      },
      {
        id: 2,
        order: 2,
        expected: false,
        response: false,
        question: '¿Tiene alguna enfermedad diagnosticada?. ¿Cuál?',
      },
      {
        id: 3,
        order: 3,
        expected: false,
        response: false,
        question: '¿Tiene SIDA o es portador de HIV?',
      },
      {
        id: 4,
        order: 4,
        expected: false,
        response: false,
        question: '¿Practica algún deporte a nivel profesional o considerado de alto riesgo? (Alpinismo, automovilismo, etc.)',
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

    this.setState({ questions });
  }

  handleStore = () => {
    this.setState({ isLoading: true });

    const { questions } = this.state;
    const { navigation } = this.props;
    const detailId = navigation.getParam('detailId');
    const data = moment();

    db.collection('deDetails').doc(detailId)
      .update({
        responses: questions,
      })
      .then(() => {
        this.setState({ isLoading: false });
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
    const { questions, isLoading } = this.state;

    return (
      <Fragment>
        <LoadingView visible={isLoading} />

        <View style={[styles.container, { paddingTop: 10 }]}>
          {
            questions.map((question, index) => 
              <View style={styles.questionBox} key={index}>
                <Text style={styles.questionNumber}>{question.order}.</Text>
                <Text style={styles.questionText}>{question.question}</Text>
                <Switch
                  value={question.response}
                  onValueChange={(value) => this.toggleSwitch(value, question.id)}
                />
              </View>
            )
          }
        </View>
        
        <TouchableOpacity
          style={styles.btnSuccessLarge}
          activeOpacity={0.8}
          onPress={() => this.handleStore()}
        >
          <Text style={styles.btnSuccessLargeText}>Registrar Cuestionario de Salud</Text>
        </TouchableOpacity>
      </Fragment>
    )
  }
}