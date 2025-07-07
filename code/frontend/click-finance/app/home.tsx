import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import ContainerMaster   from '../src/components/ContainerMaster';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World </Text>
      <ThemeToggleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
