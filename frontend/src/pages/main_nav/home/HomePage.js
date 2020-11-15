import { StyleSheet, Button, Text, View } from 'react-native'
import React from 'react'
import AppStyles from '../../../AppStyles'
import Background from 'components/background';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage( { navigation }) {

    return (
      <View>
        <Background direction='middle' />
        <View style={AppStyles.container}>
          <Text>home</Text>
          <Button 
            title="create hug" 
            onPress={() => navigation.navigate('Create Hug')}
          />
          <Button 
            title="add friend" 
            onPress={() => navigation.navigate('Add Friend')}
          />
          <Button 
            title="friend history" 
            onPress={() => navigation.navigate('Friend History')}
          />
          <Button 
            title="friend profile" 
            onPress={() => navigation.navigate('Friend Profile')}
          />
          <Button
            title='launch page'
            onPress={() => navigation.navigate('Launch Page')}
          />
        </View>
      </View>
    )
}