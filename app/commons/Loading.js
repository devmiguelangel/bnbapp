import React from 'react';
import {
  Image,
  Modal,
  View,
} from 'react-native';

export default Loading = (props) => {
  const { visible } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('./../assets/img/loading.gif')}
        />
      </View>
    </Modal>
  )
}