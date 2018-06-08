import React, { Component, Fragment } from 'react';
import {
  YellowBox,
} from 'react-native';

import { auth } from './utils/firebase';

import AuthStack from './containers/auth/AuthStack';
import HomeStack from './containers/home/HomeStack';
import Loading from './commons/Loading';

YellowBox.ignoreWarnings([
  'Warning: isMounted',
  'Module RCTImageLoader requires',
]);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: null,
    };

    this.components = {
      AuthStack,
      HomeStack,
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
        tag = 'HomeStack';
      }

      this.setState({ tag });
    });
  }

  render() {
    const { tag } = this.state;
    const TagName = this.components[tag];

    return (
      <Fragment>
        {
          tag ? (
            <TagName />
          ) : (
            <Loading visible={true} />
          )
        }
      </Fragment>
    )
  }
}