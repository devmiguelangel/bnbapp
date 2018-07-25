import React, { Component, PureComponent, Fragment } from 'react';
import {
  ActionSheetIOS,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './../assets/css/styles';

export default class ActionSheetView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Emisión de Pólizas',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
    headerBackTitle: null,
  });

  componentDidMount = () => {
    const { options } = this.props;

    if (Platform.OS === 'ios') {
      const _options = options.map(({ text }) => text);
      ActionSheetIOS.showActionSheetWithOptions({
        options: _options,
        // destructiveButtonIndex: 2,
        cancelButtonIndex: (options.length - 1),
      },
    (buttonIndex) => {
      this.props.handleAction(false, buttonIndex);
    });
    } else {
      this.setState({ modal: true });
    }    
  }

  render() {
    const { options } = this.props;
    const { modal } = this.state;

    return (
      <Fragment>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => { }}
        >
          <View style={[styles.modalBg, { justifyContent: 'flex-end', }]}>
            <View style={styles.actionSheetBox}>
              {
                options.map((option, index) => {
                  let icon = option.hasOwnProperty('icon') ? (
                    <Icon name={option.icon} size={35} color="#B0BEC5" style={{ marginRight: 15, }} />
                  ) : (
                    <Fragment></Fragment>
                  );

                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.actionSheetOption}
                      activeOpacity={0.6}
                      onPress={() => this.props.handleAction(false, index)}
                    >
                      { icon }
                      <Text style={styles.actionSheetOptionText}>{option.text}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </Modal>
      </Fragment>
    )
  }
}