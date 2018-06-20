import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const offSet = new Animated.Value(deviceHeight);

export default class PickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      field: '',
      value: '',
      lists: [],
    }
  }

  handleOpen = (field, value, lists) => {
    this.setState({
      isVisible: true,
      field,
      value,
      lists,
    }, () => {
      Animated.timing(offSet, {
        duration: 300,
        toValue: 0
      }).start();
    });
  }

  handleValueChange = (itemValue) => {
    if (itemValue) {
      this.setState({ value: itemValue }, () => {
        const { field, value, lists } = this.state;

        this.props.handleValue(field, value, lists);
      });
    }
  }

  handleClose = () => {
    Animated.timing(offSet, {
      duration: 300,
      toValue: deviceHeight
    }).start(() => this.setState({ isVisible: false }));
  }

  render() {
    const { isVisible, value, lists } = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => {}}
      >
        <View style={styles.box}>
          <Animated.View style={styles.container}>
            <View style={styles.closeButtonBox}>
              <TouchableHighlight onPress={this.handleClose} underlayColor="transparent" style={styles.closeButton}>
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableHighlight>
            </View>
            <Picker
              style={styles.picker}
              selectedValue={value}
              onValueChange={(itemValue) => this.handleValueChange(itemValue)}>
              <Picker.Item value='' label='Seleccione...' />
              {
                lists.map((item) => (
                  <Picker.Item value={item.value} label={item.label} key={item.value} />
                ))
              }
            </Picker>

          </Animated.View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'rgba(38,50,56 ,0.7)',
  },
  container: {
    transform: [{ translateY: offSet }],
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  closeButtonBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    backgroundColor: '#FAFAF8',
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  closeButtonText: {
    color: '#027afe',
    fontSize: 14,
  },
  picker: {
    backgroundColor: '#FFFFFF',
  }
});