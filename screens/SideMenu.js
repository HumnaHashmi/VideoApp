import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const SideMenu = ({ visible, onClose }) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Settings</Text>
          <Text style={styles.menuItem}>Privacy</Text>
          <Text style={styles.menuItem}>Logout</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    padding: 20,
    height: 200,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SideMenu;
