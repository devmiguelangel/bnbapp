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
    const { headerRef } = this.props;
    console.warn(headerRef);
    
    if (headerRef) {
      const details = [];

      db.collection('deDetails')
        .where('headerRef', '==', headerRef)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            details.push(doc.data());
          });

          this.setState({ details });
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    } else {
      // this.props.navigation.navigate('deData');
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
    const { enable } = this.state;

    return (
      <View style={styles.container}>
        <SearchBarView
          search={this.search}
        />

        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
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