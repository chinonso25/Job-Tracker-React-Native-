import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import firebaseConfig from '../../index';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      firebaseConfig.auth().signUp(email, password);
      console.log('singed in');
      console.log(firebaseConfig.auth().currentUser);
      navigation.navigate('Home');
      await AsyncStorage.setItem(
        'userID',
        firebaseConfig.auth().currentUser.uid,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  });

  const styles = StyleSheet.create({
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    buttons: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    form: {
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 10,
    },
    input: {
      margin: 10,
    },
  });

  return (
    <View>
      <View style={styles.form}>
        <Input label="Email" text={email} setText={text => setEmail(text)} />
        <Input
          label="Password"
          text={password}
          setText={text => setPassword(text)}
          secure={true}
        />
      </View>
      <View style={styles.buttons}>
        <Button text="Sign Up" onPress={() => navigation.navigate('Signup')} />

        <Button text="Login" onPress={login} />
      </View>
    </View>
  );
}
