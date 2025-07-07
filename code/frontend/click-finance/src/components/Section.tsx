import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

type FlexJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

type Direction = 'column' | 'row';

type Props = PropsWithChildren<{
  /** eixo principal (coluna padrão) */
  direction?: Direction;
  /** alinhamento no eixo principal */
  justify?: FlexJustify;
  /** alinhamento no eixo transversal */
  align?: FlexAlign;
}>;

/**
 * Section
 * - invisível (sem cor de fundo/padding)
 * - ocupa toda a largura e a altura visível da tela
 * - permite configurar flexDirection, justifyContent, alignItems
 */
export default function Section({
  children,
  direction = 'column',
  justify = 'flex-start',
  align = 'flex-start',
}: Props) {
  const { height } = useWindowDimensions();

  return (
    <View
      style={[
        styles.base,
        {
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          minHeight: height, // garante que preencha a viewport
        },
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: 20,
    width: '100%',
  },
});
