// components/InputDatePicker.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, useTheme as usePaperTheme } from 'react-native-paper';

import ContainerInput from './ContainerInput';
import { useTheme }   from '../context/ThemeContext';

type Props = {
  title: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function InputDatePicker({
  title,
  value,
  onChange,
  placeholder = '__/__/____',
}: Props) {
  /** tema global do seu Context */
  const { theme } = useTheme();
  const isDark    = theme === 'dark';

  /** tema base do Paper (pega fontes, roundness…) */
  const paperTheme = usePaperTheme();

  /* ---------- máscara dd/mm/aaaa -------------------- */
  function handleMasked(raw: string) {
    const digits = raw.replace(/\D+/g, '').slice(0, 8);
    let masked   = digits;
    if (digits.length > 4)
      masked = digits.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    else if (digits.length > 2)
      masked = digits.replace(/(\d{2})(\d{0,2})/, '$1/$2');

    onChange(masked);
  }

  /* ---------- override de cores só p/ este campo ----- */
const localTheme = {
  ...paperTheme,
  colors: {
    ...paperTheme.colors,
    /* texto digitado  ↓↓↓ */
    onSurface:        isDark ? '#FFFFF1' : '#1A1A1A',
    surfaceVariant:   isDark ? '#3A3A3A' : '#CFCFCF',
    onSurfaceVariant: isDark ? '#888' : '#888',     // cor do ícone/label
    placeholder:      isDark ? '#888' : '#888',
    background:       isDark ? '#1E1F24' : '#FFFFFF',
  },
};


  return (
    <ContainerInput title={title}>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        value={value}
        onChangeText={handleMasked}
        placeholder={placeholder}
        style={styles.input}
        outlineStyle={{ borderRadius: 8 }}
        theme={localTheme}          // ⬅️  aqui está o segredo
      />
    </ContainerInput>
  );
}

const styles = StyleSheet.create({
  input: { flex: 1, height: 44, fontSize: 15 },
});
