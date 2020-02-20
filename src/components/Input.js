import React from 'react';
import {TextInput} from 'react-native-paper';

export default function Input(props) {
  return (
    <TextInput
      label={props.label}
      value={props.text}
      onChangeText={props.setText}
      style={{margin: 10}}
    />
  );
}
