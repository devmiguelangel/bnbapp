import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  View,
} from 'react-native';

export default Loading = (props) => {
  const { visible } = props;
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={css.modalBox}>
        <View style={css.modalImage}>
          <Image
            source={require('./../assets/img/loading.gif')}
          />
        </View>
      </View>
    </Modal>
  )
}

const css = StyleSheet.create({
  modalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: .8,
    borderColor: '#ECEFF1',
  },
});