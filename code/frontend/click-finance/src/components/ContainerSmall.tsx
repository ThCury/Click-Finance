import React, { PropsWithChildren } from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = PropsWithChildren<{
  background?: { light: string; dark: string };
  height?: number;
}>;

export default function ContainerSmall({
  children,
  background,
  height = 160,
}: Props) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const margin = 8; // margin horizontal
  const cardWidth = (width - margin * 2) / 3.2; // 3 cards + 2 margens laterais + 2 gaps entre os cards

  const bg = background
    ? background[theme]
    : isDark
    ? '#21242b'
    : '#FFFFFF';

  const borderColor = isDark ? '#2C2C2E' : '#E6E6E6';

  return (
    <View
      style={[
        styles.card,
        {
          width: cardWidth,
          minHeight: height,
          backgroundColor: bg,
          borderColor: borderColor,
          marginHorizontal: margin / 2, // metade de cada lado para somar o total certo
        },
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 2,
    marginVertical: 6,
    elevation: 1,
    borderWidth: 1,
  },
});
