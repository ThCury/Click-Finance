// src/components/ContainerMaster.tsx
import React, { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';      // <-- importa

type ThemeBg = { light: string; dark: string };
type Props = PropsWithChildren<{ background?: ThemeBg }>;

export default function ContainerMaster({ children, background }: Props) {
  const sysScheme = useColorScheme();           // ex.: 'light' | 'dark'
  const ctx = useTheme();                       // { theme, toggle }
  const scheme = ctx?.theme ?? sysScheme ?? 'light';

  const bg = background?.[scheme] ?? (scheme === 'light' ? '#f3f4f8' : '#141720');

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, width: '100%' },
  content: { flexGrow: 1, width: '100%' },
});
