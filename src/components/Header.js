import * as React from 'react';
import {Appbar} from 'react-native-paper';

export default function Header() {
  return (
    <Appbar.Header>
      <Appbar.Content title="Job Tracker" />
    </Appbar.Header>
  );
}
