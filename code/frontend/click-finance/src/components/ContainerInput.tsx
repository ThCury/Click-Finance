// components/ContainerInput.tsx
import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  title:  string;
  children: ReactElement;       // um único filho
  style?: ViewStyle;
};

export default function ContainerInput({ title, children, style }: Props) {
  const { theme } = useTheme();
  const isDark   = theme === 'dark';

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={[
        styles.label,
        { color: isDark ? '#cfcfcf' : '#505050' },
      ]}>
        {title}
      </Text>

      {/*  box de entrada (posição relative p/ overlay do filho) */}
      <View style={[
        styles.box,
        {
          borderColor: isDark ? '#3d3d3d' : '#c7c7c7',
          backgroundColor: isDark ? '#1E1F24' : '#fff',
        },
      ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, marginBottom: 14 },
  label:   { fontSize: 14, fontWeight: '600', marginBottom: 4 },

  /** caixa onde o filho fica */
  box: {
    position: 'relative',
    borderWidth: 1.2,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
  },
});
