import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as PaperInput, useTheme as usePaperTheme } from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';

import ContainerInput from './ContainerInput';
import { useTheme } from '../context/ThemeContext';

type Props = {
  title: string;
  value: string; // Raw numeric input (e.g., "123", "123,45")
  onChange: (v: string) => void; // Raw input without additional formatting
  placeholder?: string;
  prefix?: string; // texto fixo antes do campo
};

export default function InputNumber({
  title,
  value,
  onChange,
  placeholder = '0',
  prefix = '',
}: Props) {
  /* tema app + tema Paper --------------------------------------------- */
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const paperBase = usePaperTheme();

  const paperTheme = {
    ...paperBase,
    colors: {
      ...paperBase.colors,
      primary: '#B39DDB', // lilás focado
      outline: isDark ? '#3A3A3A' : '#CFCFCF',
      onSurface: isDark ? '#F1F1F1' : '#1A1A1A',
      onSurfaceVariant: isDark ? '#888' : '#888',
      placeholder: isDark ? '#888' : '#888',
      background: isDark ? '#1E1F24' : '#FFFFFF',
      surfaceVariant: isDark ? '#3A3A3A' : '#CFCFCF',
    },
  };

  return (
    <ContainerInput title={title}>
      <PaperInput
        mode="outlined"
        value={value || ''} // Ensure value is always a string
        onChangeText={onChange} // Pass raw input directly
        placeholder={placeholder}
        keyboardType="numeric"
        outlineStyle={{ borderRadius: 8 }}
        left={prefix ? <PaperInput.Affix text={prefix} /> : null}
        style={styles.input}
        theme={paperTheme}
      />
    </ContainerInput>
  );
}

const styles = StyleSheet.create({
  input: { flex: 1, height: 44, fontSize: 15 },
});