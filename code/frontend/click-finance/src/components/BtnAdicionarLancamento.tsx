import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalLancamento from './ModalLancamento';
import { useTheme } from '../context/ThemeContext';

export default function BtnAdicionarLancamento() {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDark ? '#1f1f25' : '#e5e5e5' }]}
        onPress={() => setVisible(true)}
      >
        <MaterialCommunityIcons
          name="plus"
          size={20}
          color={isDark ? '#ccc' : '#333'}
        />
        <Text style={[styles.text, { color: isDark ? '#ccc' : '#333' }]}>
          Adicionar Ativo
        </Text>
      </TouchableOpacity>

      <ModalLancamento visible={visible} onDismiss={() => setVisible(false)} onSubmit={function (data: any): void {
              throw new Error('Function not implemented.');
          } } />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    // gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
