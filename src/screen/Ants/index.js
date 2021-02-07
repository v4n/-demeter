import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {gql, useQuery, useReactiveVar} from '@apollo/client';
import {winLikehoodStateVar, winLikehoodVar} from '../../cache';
import {generateAntKey} from '../../utils/ants';
import batchWinLikelihoodCalculator from '../../services/ant/batchWinLikelihoodCalculator';
import Ant from '../../components/Ant';
import Loading from '../../components/Loading';
import {WIN_LIKEHOOD_STATES} from '../../constants';
import styles from './styles';

const GET_ANTS = gql`
  query GetAnts {
    ants {
      name
      length
      color
      weight
    }
  }
`;

export default function Ants() {
  const {loading, error, data} = useQuery(GET_ANTS);
  const winLikehoodState = useReactiveVar(winLikehoodStateVar);
  const winLikehood = useReactiveVar(winLikehoodVar);

  const updateWinLikehood = ({key, entry}) => {
    winLikehoodVar({
      ...winLikehoodVar(),
      ...{
        [key]: entry,
      },
    });
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Text>ERROR: {error.message}</Text>;
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ants</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.winLikehoodState}>{winLikehoodState.text}</Text>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={() => {
            winLikehoodStateVar(WIN_LIKEHOOD_STATES.IN_PROGRESS);
            batchWinLikelihoodCalculator({
              ants: data.ants,
              onEntryStart: ({key}) => {
                updateWinLikehood({key, entry: {loading: true}});
              },
              onEntryCompletion: ({key, value}) => {
                updateWinLikehood({key, entry: {loading: false, value}});
              },
              onCompletion: () => {
                winLikehoodStateVar(WIN_LIKEHOOD_STATES.ALL_CALCULATED);
              },
            });
          }}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...data.ants].sort((antA, antB) => {
          const keyA = generateAntKey(antA);
          const keyB = generateAntKey(antB);

          const valueA = winLikehoodVar()[keyA]?.value || 0;
          const valueB = winLikehoodVar()[keyB]?.value || 0;

          return valueB - valueA;
        })}
        renderItem={({item: ant}) => (
          <Ant ant={ant} winLikehood={winLikehood} />
        )}
        keyExtractor={(item) => generateAntKey(item)}
      />
    </View>
  );
}
