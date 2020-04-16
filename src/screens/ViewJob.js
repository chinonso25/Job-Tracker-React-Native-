import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button} from '../components/Index';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {Dropdown} from 'react-native-material-dropdown';
import {Headline} from 'react-native-paper';
import {Subheading} from 'react-native-paper';

export default function ViewJob({route, navigation}, props) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState([]);
  const [stage, setStage] = useState('');
  const {jobId} = route.params;

  const updateJob = async () => {
    setUser(await AsyncStorage.getItem('userID'));
    try {
      if (stage === 'Unsuccessful') {
        firebase
          .firestore()
          .collection('Users')
          .doc(user)
          .collection('Jobs')
          .doc(jobId)
          .update({
            Stage: stage,
            Active: false,
          });
        console.log(stage);
        setLoading(false);
      } else {
        firebase
          .firestore()
          .collection('Users')
          .doc(user)
          .collection('Jobs')
          .doc(jobId)
          .update({
            Stage: stage,
            Active: true,
          });
        console.log('Successful');
      }
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const viewJob = async id => {
    setUser(await AsyncStorage.getItem('userID'));
    firebase
      .firestore()
      .collection('Users')
      .doc(await AsyncStorage.getItem('userID'))
      .collection('Jobs')
      .doc(jobId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          const data = doc.data();
          data.id = doc.id;
          console.log(data);
          setJob(data);
          setStage(data.Stage);
          setLoading(false);

          return data;
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  useEffect(() => {
    viewJob();
  }, []);

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
    {
      value: 'Unsuccessful',
    },
  ];
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <View style={styles.form}>
        <Headline>Job Role:</Headline>
        <Subheading>{job.Role}</Subheading>
        <Headline>Company:</Headline>
        <Subheading>{job.Company}</Subheading>
        <Headline>Salary:</Headline>
        <Subheading>{job.Salary}</Subheading>
        <Headline>Location:</Headline>
        <Subheading>{job.Location}</Subheading>

        <Dropdown
          value={stage}
          label="Stage"
          data={data}
          onChangeText={text => setStage(text)}
        />
      </View>
      <View style={styles.buttons}>
        <Button text="Update Job" icon="update" onPress={updateJob} />
      </View>
    </View>
  );
}
