import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type Props = {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  titleLeft: string;
  titleRight: string;
  valueLeft: string;
  valueRight: string;
  subValueLeft: string;
  colorLeft?: string;
};

export default function CardVariacao({
  icon,
  titleLeft,
  titleRight,
  valueLeft,
  valueRight,
  subValueLeft,
  colorLeft = 'green',
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    text: isDark ? '#f2f2f2' : '#222',
    value: isDark ? '#f2f2f2' : '#222',
    muted: '#989c9f',
  };

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.rowTop}>
        <View style={styles.rowTopLeft}>
          <MaterialCommunityIcons name={icon} size={16} color={colors.text} />
          <Text style={[styles.title, { color: colors.text }]}>{titleLeft}</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{titleRight}</Text>
      </View>

      {/* Middle Row */}
      <View style={styles.rowMiddle}>
        <View style={styles.column}>
          <Text style={[styles.mainValue, { color: colors.text }]}>{valueLeft}</Text>
          <Text style={[styles.subValue, { color: colors.text }]}>{subValueLeft}</Text>
        </View>
        <Text style={[styles.mainValue, { color: colorLeft }]}>{valueRight}</Text>
      </View>

      {/* Bottom Row vazia */}
      <View style={styles.rowBottom}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingEnd: 70,
  },
  rowTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    alignItems: 'center',
    marginTop: 20,

  },
  rowBottom: {
    height: 1,
  },
  title: {
    fontSize: 14,
  },
  mainValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subValue: {
    fontSize: 12,
    marginTop: 2,
  },
  column: {
    flexDirection: 'column',
  },
});
