import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import {openDatabase} from 'BlackBerry-Dynamics-for-React-Native-SQLite-Storage';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

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
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity
        onPress={test}
        style={{padding: 20, backgroundColor: 'red'}}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
