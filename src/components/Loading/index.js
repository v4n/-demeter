import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';

export default function Loading() {
  return (
    <View style={styles.loading}>
      <Image
        style={styles.loadingImage}
        source={{uri: 'https://i.imgur.com/2NwLD0P.png'}}
      />
      <Text>Loading...</Text>
    </View>
  );
}
