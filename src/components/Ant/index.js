import React from 'react';
import {View, Text} from 'react-native';
import {generateAntKey} from '../../utils/ants';
import {WIN_LIKEHOOD_STATES} from '../../constants';
import styles from './styles';

export default function Ants({ant, winLikehood}) {
  const key = generateAntKey(ant);
  const winLikehoodEntry = winLikehood[key] || {};

  return (
    <View key={key} style={styles.ant}>
      <Text>Name: {ant.name}</Text>
      <Text>Length: {ant.length}</Text>
      <Text>Color: {ant.color}</Text>
      <Text>Weight: {ant.weight}</Text>

      {!winLikehoodEntry.loading && !winLikehoodEntry.value && (
        <Text>{WIN_LIKEHOOD_STATES.NOT_YET_RUN.text}</Text>
      )}
      {winLikehoodEntry.loading && (
        <Text>{WIN_LIKEHOOD_STATES.IN_PROGRESS.text}</Text>
      )}
      {winLikehoodEntry.value && <Text>{winLikehoodEntry.value}</Text>}
    </View>
  );
}
