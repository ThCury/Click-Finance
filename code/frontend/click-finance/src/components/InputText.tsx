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

export default function InputText({
  title,
  value,
  onChange,
  placeholder = '',
}: Props) {
  /** tema global do seu Context */
  const { theme } = useTheme();
  const isDark    = theme === 'dark';

  /** tema base do Paper (pega fontes, roundness…) */
  const paperTheme = usePaperTheme();
  const BASE_URL = 'http://127.0.0.1:8000'; // ajuste para prod

  /* ---------- máscara dd/mm/aaaa -------------------- */
async function searchAssets(keyword: string) {
  // sempre atualize o input
  onChange(keyword);

  // evita chamadas inúteis
  if (keyword.trim().length < 2) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await fetch(
      `${BASE_URL}/search/${encodeURIComponent(keyword.trim())}`
    );

    switch (res.status) {
      case 200:
        setSuggestions(await res.json());
        break;
      case 303: // nenhum resultado
        setSuggestions([]);
        break;
      case 403: // problema com API-key no back-end
      case 404: // erro da Alpha Vantage ou upstream
        console.warn(await res.text());
        setSuggestions([]);
        break;
      default:
        console.error('Erro inesperado', res.status);
    }
  } catch (err) {
    console.error('Falha na requisição', err);
  }
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
        onChangeText={onChange} // Pass raw input directly
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
function setSuggestions(arg0: never[]) {
    throw new Error('Function not implemented.');
}

