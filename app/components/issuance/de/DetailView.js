import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './../../../actions/home';

class DetailView extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> {this.props.headerRef} </Text>
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