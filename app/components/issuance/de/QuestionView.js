import React, { Component, Fragment } from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import styles from './../../../assets/css/styles';

export default class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
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
        response: true,
        question: '¿Se encuentra usted actualmente sano?',
      },
      {
        id: 2,
        order: 2,
        response: false,
        question: '¿Tiene alguna enfermedad diagnosticada?. ¿Cuál?',
      },
      {
        id: 3,
        order: 3,
        response: false,
        question: '¿Tiene SIDA o es portador de HIV?',
      },
      {
        id: 4,
        order: 4,
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

  render() {
    const { questions } = this.state;

    return (
      <Fragment>
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