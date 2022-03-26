/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {openDatabase} from 'BlackBerry-Dynamics-for-React-Native-SQLite-Storage';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const test = async () => {
    const db = await openDatabase(
      {name: 'RNTestDatabase.db'},
      () => {
        console.log('Database is succesfully opened!');
      },
      () => {
        console.log('Error in opening database!');
      },
    );

    // ...

    db.transaction(
      tx => {
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type="table" AND name="Users";`,
          [],
          (tx, result) => {
            if (result.rows.length === 0) {
              tx.executeSql('DROP TABLE IF EXISTS Users', []);
            }

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20), phone INT(10), address VARCHAR(255))',
              [],
            );
          },
        );
      },
      error => {
        console.log('Transaction error: ', error);
      },
      () => {
        console.log(
          'Transaction for initialization users table is succesfully finished!',
        );
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity
          onPress={test}
          style={{padding: 20, backgroundColor: 'red'}}>
          <Text>Click me</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
/**
 * 
 * "react-native-video": "git+ssh://git@github.com/LeapXpert/react-native-video.git#fix-identifier",
    "react-native-view-shot": "^3.1.2",
    "react-native-webview": "8.0.0",
    "react-redux": "7.2.2"
 */
