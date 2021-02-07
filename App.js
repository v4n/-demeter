import React from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {cache} from './src/cache';
import Ants from './src/screen/Ants';
import styles from './src/styles';

const client = new ApolloClient({
  uri: 'https://guarded-shore-81814.herokuapp.com/graphql',
  cache,
});

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.ant}>
        <Ants />
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
