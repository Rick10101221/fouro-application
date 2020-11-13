import React, { useState } from 'react';
import { StyleSheet, View, Button, TouchableHighlight } from 'react-native';
import AppStyles from '../AppStyles';


// TODO: Fix hitbox with TouchableOpacity (hitbox is too large
// and not representative of the button's size)

export default function LinkedButton({ navigation, link, text }) {
  // TODO: Later
  // const linkedButtonContainer = {}

  return (
    <TouchableHighlight 
      onPress={() => navigation.navigate(`${link}`)}
    >
      <View style={styles.linkedButtonContainer}>
        <Button 
          style={styles.linkedButton}
          color='white'
          title={text}
          onPress={() => navigation.navigate(`${link}`)}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  linkedButtonContainer: {
    backgroundColor: '#FB7250',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderRadius: 10,
  },
  linkedButton: {
    borderRadius: 100,
  },
})