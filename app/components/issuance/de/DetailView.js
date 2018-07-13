import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './../../../actions/home';
import { db } from './../../../utils/firebase';
import SearchBarView from './../../../commons/SearchBarView';
import DetailItemView from './DetailItemView';
import styles from './../../../assets/css/styles';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true,
      details: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Detalle',
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'left'
    },
    headerBackTitle: null,
  });

  componentDidMount = () => {
    console.warn('mount');
    
    this.getDetails();  
  }

  getDetails = async () => {
    const { headerRef } = this.props;

    if (headerRef) {
      const querySnapshot = await db.collection('deDetails')
        .where('headerRef', '==', headerRef.id)
        .get();
  
      if (querySnapshot.size >= 1) {
        const details = [];
        
        for (const doc of querySnapshot.docs) {
          let data = { ...doc.data() };
          let client = await data.clientRef.get();
          data.client = client.data();
  
          details.push(data);
        }
  
        this.setState({ details });
      }
    }
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

  renderItem = (item) => {
    return (
      <DetailItemView
        item={item}
        success={this.success}
        setScrollEnabled={this.setScrollEnabled}
      />
    )
  }

  search = (value) => {
    this.props.navigation.navigate('deClient');
  }

  render() {
    const { details, enable } = this.state;

    return (
      <View style={styles.container} key={Date.now()}>
        <SearchBarView
          search={this.search}
        />

        <FlatList
          data={details}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => this.renderItem(item)}
          scrollEnabled={enable}
        />
        
        <Text> {typeof this.props.headerRef} </Text>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    headerRef: state.issuance.headerRef,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);