// src/components/ThemeToggleButton.tsx
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Pressable
      onPress={toggle}
      style={styles.btn}
      android_ripple={{ color: '#555', borderless: true }}>
      <Feather
        name={isDark ? 'sun' : 'moon'}
        size={20}
        color={isDark ? '#FFFF' : '#333'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 6,                // área de toque
    borderRadius: 20,          // ripple circular
    alignItems: 'center',
    justifyContent: 'center',
  },
});
