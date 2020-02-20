import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

export default function Lists(props) {
  const [expanded, setExpanded] = useState(true);

  const _handlePress = () => setExpanded(!expanded);
  const navigation = useNavigation();

  const _jobPressed = itemID => {
    console.log(itemID);
    navigation.navigate('ViewJob', {
      jobId: itemID,
    });
  };

  const renderActJobItem = ({item}) => (
    <TouchableOpacity onPress={() => _jobPressed(item.id)}>
      <List.Item
        key={item.id}
        title={item.Role}
        description={`${item.Company} - £${item.Salary}`}
      />
    </TouchableOpacity>
  );

  const renderInActJobItem = ({item}) => (
    <TouchableOpacity onPress={() => _jobPressed(item.id)}>
      <List.Item
        key={item.id}
        title={item.Role}
        description={`${item.Company} - £${item.Salary}`}
      />
    </TouchableOpacity>
  );

  return (
    <List.Section title="Jobs">
      <List.Accordion
        title="Active Jobs"
        expanded={true}
        left={icon => <List.Icon {...icon} icon="thumb-up-outline" />}>
        <FlatList data={props.act} renderItem={renderActJobItem} />
      </List.Accordion>

      <List.Accordion
        title="Inactive Jobs"
        left={icon => <List.Icon {...icon} icon="thumb-down-outline" />}
        expanded={true}
        onPress={_handlePress}>
        <FlatList data={props.inact} renderItem={renderInActJobItem} />
      </List.Accordion>
    </List.Section>
  );
}
