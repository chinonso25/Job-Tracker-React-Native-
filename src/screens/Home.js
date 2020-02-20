import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import firebaseConfig from '../../index';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Lists from '../components/Lists';
import {FAB} from 'react-native-paper';

export default function Jobtracker({navigation}) {
  const [actJobs, setactJobs] = useState([]);
  const [inactJobs, setinactJobs] = useState([]);
  const [user, setUser] = useState();

  const getJobs = async () => {
    setUser(await AsyncStorage.getItem('userID'));

    firebase
      .firestore()
      .collection('Users')
      .doc(await AsyncStorage.getItem('userID'))
      .collection('Jobs')
      .where('Active', '==', true)
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data.id = _doc.id;
          return data;
        });
        setactJobs(notes.reverse());
        setUser(user);
      });

    firebase
      .firestore()
      .collection('Users')
      .doc(await AsyncStorage.getItem('userID'))
      .collection('Jobs')
      .where('Active', '==', false)
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data.id = _doc.id;
          return data;
        });
        setinactJobs(notes.reverse());
      });
  };

  useEffect(() => {
    getJobs();
  }, []);

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <View style={{flex: 1}}>
      <Lists act={actJobs} inact={inactJobs} />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddJob')}
      />
    </View>
  );
}
