import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import firebaseConfig from '../../index';
import AsyncStorage from '@react-native-community/async-storage';

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const signup = async () => {
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email, password);
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
        <Input label="Name" text={name} setText={text => setName(text)} />
        <Input label="Email" text={email} setText={text => setEmail(text)} />
        <Input
          label="Password"
          text={password}
          setText={text => setPassword(text)}
        />
        <Input
          label="Retype Password"
          text={secondPassword}
          setText={text => setSecondPassword(text)}
        />
      </View>
      <View style={styles.buttons}>
        <Button text="Sign Up" onPress={signup} />

        <Button text="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}
