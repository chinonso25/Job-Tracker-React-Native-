import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {Dropdown} from 'react-native-material-dropdown';

export default function AddJob() {
  const [user, setUser] = useState('');
  const [stage] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const addJob = async () => {
    setUser(await AsyncStorage.getItem('userID'));
    try {
      firebase
        .firestore()
        .collection('Users')
        .doc(user)
        .collection('Jobs')
        .add({
          Role: role,
          Company: company,
          Location: location,
          Salary: salary,
          Stage: stage,
          Active: true,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
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

  let data = [
    {
      value: 'Application Sent',
    },
    {
      value: 'Telephone Interview',
    },
    {
      value: 'Video Interview',
    },
    {
      value: 'Technical Test',
    },
    {
      value: 'Face-To-Face Interview',
    },
    {
      value: 'Assessment Centre',
    },
    {
      value: 'Offer Given',
    },
  ];

  return (
    <View>
      <View style={styles.form}>
        <Input label="Role" text={role} setText={text => setRole(text)} />
        <Input
          label="Company"
          text={company}
          setText={text => setCompany(text)}
        />
        <Input
          label="Location"
          text={location}
          setText={text => setLocation(text)}
        />
        <Input label="Salary" text={salary} setText={text => setSalary(text)} />

        <Dropdown label="Stage" data={data} />
      </View>
      <View style={styles.buttons}>
        <Button text="Add Job" onPress={addJob} icon="plus" />
      </View>
    </View>
  );
}
