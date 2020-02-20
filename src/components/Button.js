import * as React from 'react';
import {Button} from 'react-native-paper';

const MyComponent = props => (
  <Button icon={props.icon} mode="contained" onPress={props.onPress}>
    {props.text}
  </Button>
);

export default MyComponent;
