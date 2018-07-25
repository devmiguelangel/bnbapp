import React, { Component } from 'react';
import {
  DatePickerAndroid,
  DatePickerIOS,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import { $RobotoRegular } from './../assets/css/styles';

const deviceWidth = Dimensions.get('window').width;

export default class DatePickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      field: '',
      date: null,
    }
  }

  _handleOpen = async (field, date) => {
    if (Platform.OS === 'android') {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: date,
        });

        if (action !== DatePickerAndroid.dismissedAction) {
          const newDate = moment([year, month, day]).toDate();
          
          this.props.handleValue(field, newDate);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    } else {
      this.setState({ field, date, }, () => {
        this.setState({
          modal: true
        });
      });
    }
  }

  _handleClose = () => {
    this.setState({ modal: false });
  }
  
  _handleOk = () => {
    const { field, date } = this.state;

    this.props.handleValue(field, date);

    this.setState({ modal: false });
  }

  render() {
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        {
          Platform.OS === 'ios' &&
          <View style={styles.container}>
            <View style={styles.pickerBox}>
              <DatePickerIOS
                date={this.state.date}
                onDateChange={(newDate) => { this.setState({ date: newDate }) }}
                mode="date"
                locale="es"
              />
              <View style={styles.actionBox}>
                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.4}
                  onPress={() => this._handleClose()}
                >
                  <Text style={styles.actionText}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.4}
                  onPress={() => this._handleOk()}
                >
                  <Text style={styles.actionText}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(38,50,56 ,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerBox: {
    width: '90%',
    height: (deviceWidth - 100),
    backgroundColor: 'white'
  },
  actionBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 20,
    color: '#007aff',
    fontFamily: $RobotoRegular
  },
});