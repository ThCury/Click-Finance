import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type Props = {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  mainValue: string;
  subTitle: string;
  subValue: string;
};

export default function CardProvento({
  icon,
  title,
  mainValue,
  subTitle,
  subValue,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    text: isDark ? '#d3d3d3' : '#888',
    value: isDark ? '#f2f2f2' : '#222',
    muted: '#989c9f',
  };

  return (
    <View style={[styles.container, { paddingVertical: 5 }]}>
      {/* Linha 1: Ícone + Título */}
      <View style={styles.rowTop}>
        <MaterialCommunityIcons name={icon} size={16} color={colors.text} />
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>

      {/* Linha 2: Valor principal (centralizado) */}
      <View style={styles.rowMiddle}>
        <Text style={[styles.mainValue, { color: colors.value }]}>{mainValue}</Text>
      </View>

      {/* Linha 3: Subtítulo + Subvalor */}
      <View style={styles.rowBottom}>
        <Text style={[styles.subTitle, { color: colors.text }]}>{subTitle}</Text>
        <Text style={[styles.subValue, { color: colors.value }]}>{subValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
  },
  rowMiddle: {
    flexDirection: 'row',
    paddingHorizontal: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBottom: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
  },
  mainValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
  },
  subValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});
