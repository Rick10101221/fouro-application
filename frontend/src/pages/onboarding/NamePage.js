import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableWithoutFeedback, 
  Keyboard,
  Animated,
  ImageBackground,
} from 'react-native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
import { useIsFocused } from '@react-navigation/native';
import BackgroundImg from 'assets/gradients/middle.png';
import { DimensionContext } from '../../contexts/DimensionContext';


export default function NamePage({ navigation, route }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [startUp, setStartUp] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { windowWidth, windowHeight } = useContext(DimensionContext)
  const fade = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (startUp) {
      setStartUp(false);
      fadeIn();
    }
    if (!isFocused) {
      setMounted(false);
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  }, []);

  const checkFilled = () => {
    return firstName !== '' && 
      lastName !== '' &&
      username !== '';
  }

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const submitHandler = async () => {
    // function to check if user with username is already taken (waiting on backend)
    // const usernameTaken = await UsersAPI.usernameTaken(username);
    // if (usernameTaken) {
    //   setUserExists(true);
    //   timeout();
    //   return;
    // }
    // await UsersAPI.updateUserProfile(username, firstName, lastName);
    let { user } = route.params;
    user['username'] = username.trim();
    user['firstName'] = firstName.trim();
    user['lastName'] = lastName.trim();
    console.log('user in namePage: ', user);
    navigation.navigate('Pic Upload Page', { user: user });
  }

  const timeout = () => {
    if (mounted) {
      setTimeout(() => {
        setUserExists(false);
      }, 5000);
      return true;
    }
  }

  const styles = StyleSheet.create({
    errorText: {
      color: 'red',
      fontSize: 18,
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
    whiteBox: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 30,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: isKeyboardVisible ? windowHeight / 3 : 0,
    },
    backgroundImg: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    }
  });

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <Animated.View opacity={fade} style={{flex: 1,}}>
        <ImageBackground
          source={BackgroundImg}
          style={styles.backgroundImg}
        >
          <View style={styles.whiteBox}>
            <CustomTextField 
              titleText='First Name' 
              placeholder='Darth'
              setField={setFirstName}
              required={true}
            />

            <CustomTextField 
              titleText='Last Name' 
              placeholder='Vader'
              setField={setLastName}
              required={true}
            />

            <CustomTextField 
              titleText='Username' 
              placeholder='Imposter'
              setField={setUsername}
              required={true}
            />

            {
              checkFilled() &&
              <LinkedButton
                text='SUBMIT'
                color='#FFC24A'
                onPress={() => submitHandler()}
              />
            }
            {
              userExists && 
              <View style={styles.textContainer}>
                <Text style={styles.errorText}>
                  That username is taken!
                </Text>
              </View>
            }
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}