import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  function pressHandle(){
    Alert.alert("Button has been pressed!")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>My First React Native App!</Text>
      <Text>This Is A Test App..More To Come!</Text>
      <StatusBar style="auto" />
      <Button title="Press Me" onPress={pressHandle}/>
    </SafeAreaView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
