import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './../../../actions/home';
import { db } from './../../../utils/firebase';
import SearchBarView from './../../../commons/SearchBarView';
import DetailItemView from './DetailItemView';
import styles, { $RobotoMedium, $RobotoRegular } from './../../../assets/css/styles';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true,
      result: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Detalle',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left',
      ...Platform.select({
        android: {
          marginLeft: 55,
        }
      })
    },
    headerBackTitle: null,
  });

  componentDidMount = () => {
    
  }

  success = (key) => {
    // console.warn(key);
    
    /* const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data,
    }); */
  }

  setScrollEnabled = (enable) => {
    this.setState({ enable });
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator}></View>
    )
  }

  renderItem = (item, index) => {
    return (
      <DetailItemView
        item={item}
        index={index}
        success={this.success}
        setScrollEnabled={this.setScrollEnabled}
      />
    )
  }

  search = (value) => {
    this.props.navigation.navigate('deClient');
  }

  result = () => {
    this.setState({ result: true });
  }
  
  issuance = () => {
    this.setState({ result: false });
  }

  render() {
    const { enable, result } = this.state;
    const { details } = this.props;

    return (
      <View style={styles.bg}>
        <View style={styles.container} key={Date.now()}>
          <SearchBarView
            search={this.search}
          />

          <FlatList
            data={details}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            scrollEnabled={enable}
            contentContainerStyle={{ borderBottomWidth: 0.5, borderBottomColor: '#CFD8DC', }}
          />
        </View>

        {
          details.length > 0 && (
            <TouchableOpacity
              style={styles.btnSuccessLarge}
              activeOpacity={0.8}
              onPress={() => this.result()}
            >
              <Text style={styles.btnSuccessLargeText}>Continuar</Text>
            </TouchableOpacity>
          )
        }

        <Modal
          animationType="fade"
          transparent={true}
          visible={result}
          onRequestClose={() => {}}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(30,50,56, .70)', }}
          >
            <View style={{ width: '85%', height: 'auto', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 30, paddingHorizontal: 10, backgroundColor: 'white', }}>
              <Image
                style={{ width: 260, height: 98.27, alignSelf: 'center', }}
                source={require('./../../../assets/img/nacional-seguros-02.png')}
              />
              <Text style={{ fontFamily: $RobotoMedium, fontSize: 20, color: '#607D8B', marginTop: 20, }}>Tasa del prestamo:</Text>
              <Text style={{ fontFamily: $RobotoRegular, fontSize: 14, color: '#37474F', marginTop: 20, }}>0.0600 % Mensual ó 0.72 % Anual:</Text>

              <TouchableOpacity
                style={[styles.btnSuccessMedium, { marginTop: 30, }]}
                activeOpacity={0.8}
                onPress={() => this.issuance()}
              >
                <Text style={styles.btnSuccessMediumText}>Emitir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export const getDetails = async (headerRef) => {
  const details = [];

  if (headerRef) {
    const querySnapshot = await db.collection('deDetails')
      .where('headerRef', '==', headerRef)
      .orderBy('createdAt', 'asc')
      .get();

    if (querySnapshot.size >= 1) {
      for (const doc of querySnapshot.docs) {
        let data = { ...doc.data() };
        let client = await data.clientRef.get();
        data.client = client.data();

        details.push(data);
      }
    }
  }

  return details;
}

const mapStateToProps = (state, props) => {
  return {
    headerRef: state.issuance.headerRef,
    details: state.issuance.details,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);