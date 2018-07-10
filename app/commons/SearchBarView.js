import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchBarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} size={25} color="#8E8E93" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputText}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Buscar cliente"
              placeholderTextColor="#8E8E93"
              underlineColorAndroid="transparent"
              value={search}
              onChangeText={(value) => this.handleInputChange('search', value)}
              onSubmitEditing={() => this.props.search(search)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={.8}
          >
            <Icon name={Platform.OS === 'ios' ? 'ios-mic' : 'md-mic'} size={25} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            activeOpacity={.8}
          >
            <Icon name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close'} size={25} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(142,142,147, .12)',
        borderRadius: 10,
      },
    }),
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 7,
  },
  inputText: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    color: '#4A4A4A',
    padding: 0,
  },
});