/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import * as firebase from 'firebase';
require('firebase/auth');

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCuN6JJ921ntcalJbwqibMMtYnSlboEFSs',
  authDomain: 'job-tracker-18edb.firebaseapp.com',
  databaseURL: 'https://job-tracker-18edb.firebaseio.com',
  projectId: 'job-tracker-18edb',
  storageBucket: 'job-tracker-18edb.appspot.com',
  messagingSenderId: '243732888455',
  appId: '1:243732888455:web:b28a112f19aa93e3843122',
  measurementId: 'G-X6N7VH6Y1Y',
});

// Initialize Firebase

export default firebaseConfig;

AppRegistry.registerComponent(appName, () => App);
