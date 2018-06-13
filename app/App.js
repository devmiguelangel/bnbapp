import React, { Component, Fragment } from 'react';
import {
  YellowBox,
} from 'react-native';

import { auth } from './utils/firebase';

import AuthStack from './containers/auth/AuthStack';
import AppStack from './containers/AppStack';
import Loading from './commons/Loading';

YellowBox.ignoreWarnings([
  'Warning: isMounted',
  'Module RCTImageLoader requires',
  'Setting a timer',
]);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: null,
      isLoading: true,
    };

    this.components = {
      AuthStack,
      AppStack,
    };
  }

  componentDidMount = () => {
    /* auth.signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    }); */

    let tag = 'AuthStack';

    auth.onAuthStateChanged(user => {
      if (user) {
        tag = 'AppStack';
      }

      this.setState({ tag, isLoading: false });
    });
  }

  render() {
    const { tag, isLoading } = this.state;
    const TagName = this.components[tag];

    return (
      <Fragment>
        <Loading visible={isLoading} />
        {
          tag && (
            <TagName />
          )
        }
      </Fragment>
    )
  }
}