import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert } from 'react-native';

import Results from "./Results.js"

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>General Election Presidential Results</Text>
      <Results />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
  },
  header: {
    textAlign: "center",
    fontSize: 25
  }
});
