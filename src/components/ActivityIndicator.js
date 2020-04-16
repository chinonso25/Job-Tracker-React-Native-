import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const MyComponent = () => (
  <ActivityIndicator
    animating={true}
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    color={'#aed581'}
  />
);

export default MyComponent;
