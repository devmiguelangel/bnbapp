import React, { PureComponent } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const { width } = Dimensions.get('window');

import { $RobotoMedium, $RobotoRegular, $RobotoLight } from './../../../assets/css/styles';

export default class DetailItemView extends PureComponent {
  constructor(props) {
    super(props);
    // this.gestureDelay = -35;
    this.gestureDelay = 35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -180) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }

        /* if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        } */
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: { x: -210, y: 0 },
            duration: 300,
          }).start(() => {
            // this.props.success(this.props.item);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = { position };
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }
  
  render() {
    const { item, index } = this.props;

    return (
      <View style={styles.listItem}>
        <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <View style={styles.detailBox}>
            <View style={styles.headlineBox}>
              <Text style={styles.headlineText}>{index === 0 ? 'T' : `C${index}`}</Text>
            </View>
            <View style={styles.detailDataBox}>
              <Text style={styles.detailDataText01}>{`${item.client.firstName} ${item.client.lastName} ${item.client.motherLastName}`}</Text>
              <Text style={styles.detailDataText02}>{`Doc. de Identidad: ${item.client.dni} ${item.client.extension}`}</Text>
              <Text style={styles.detailDataText02}>{`Fecha de Nacimiento: ${moment(item.client.birthdate, 'X').format('DD/MM/YYYY')}`}</Text>
            </View>
          </View>
          <View style={styles.actionCell}>
            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: '#3DA9AB' }]}
              activeOpacity={0.8}
            >
              <Icon name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'} size={30} color="white" style={{ marginTop: 5 }} />
              <Text style={styles.actionText}>Custionario de Salud</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: '#44BDF4' }]}
              activeOpacity={0.8}
            >
              <Icon name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} size={30} color="white" style={{ marginTop: 5 }} />
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: '#F34B56' }]}
              activeOpacity={0.8}
            >
              <Icon name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'} size={30} color="white" style={{ marginTop: 5 }} />
              <Text style={styles.actionText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 70,
    marginRight: -210,
    justifyContent: 'center',
    backgroundColor: '#F8FAFF',
  },
  actionCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 210,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
  },
  actionText: {
    marginTop: 0,
    fontFamily: $RobotoLight,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  detailBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 70,
    marginRight: 210,
    backgroundColor: 'white',
  },
  headlineBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 40,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CFD8DC',
  },
  headlineText: {
    fontFamily: $RobotoRegular,
    fontSize: 28,
    color: '#78909C',
  },
  detailDataBox: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 20,
  },
  detailDataText01: {
    fontFamily: $RobotoMedium,
    fontSize: 17,
    color: '#455A64',
  },
  detailDataText02: {
    fontFamily: $RobotoLight,
    fontSize: 14,
    color: 'black',
  },
});