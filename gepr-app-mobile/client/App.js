import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native';

import Results from "./Results.js"

export default function App() {

  let size = Dimensions.get("screen").width

  let headerSize = size > 400 ? 25 : 22

  let header = {
    textAlign: "center",
    color: "white",
    fontSize: headerSize
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={header}>General Election Presidential Results</Text>
      </View>
      <Results />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
  },
  headerContainer: {
    justifyContent: "center",
    backgroundColor: "dodgerblue",
    height: 50
  },
  /*header: {
    textAlign: "center",
    color: "white",
    fontSize: 25
  }*/
});
