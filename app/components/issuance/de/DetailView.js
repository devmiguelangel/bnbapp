import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './../../../actions/home';
import SearchBarView from './../../../commons/SearchBarView';
import styles from './../../../assets/css/styles';

class DetailView extends Component {
  renderItem = (item) => {
    return (
      <View style={styles.detailBox}>
        <View style={styles.headlineBox}>
          <Text style={styles.headlineText}>T</Text>
        </View>
        <View style={styles.detailDataBox}>
          <Text style={styles.detailDataText01}>Miguel Angel Mamani Gutierrez</Text>
          <Text style={styles.detailDataText02}>6814906 LP</Text>
          <Text style={styles.detailDataText02}>03/09/1988</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBarView />

        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => this.renderItem(item)}
          scrollEnabled={true}
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