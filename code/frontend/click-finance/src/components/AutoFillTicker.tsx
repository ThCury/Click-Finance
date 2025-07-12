// components/AutoFillTicker.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  TextInput,
  List,
  ActivityIndicator,
  useTheme as usePaperTheme,
} from 'react-native-paper';

import ContainerInput from './ContainerInput';
import { useTheme } from '../context/ThemeContext';

const BASE_URL = 'http://127.0.0.1:8000'; // ajuste em prod
const DEBOUNCE = 400;                     // ms

type Props = {
  title: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function AutoFillTicker({
  title,
  value,
  onChange,
  placeholder = '',
}: Props) {
  /* ---------- tema global ---------- */
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const paperTheme = usePaperTheme();

  /* ---------- estados ---------- */
  const [query, setQuery] = useState(value);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);   // ✅ corrige o erro TS2322

  /* ---------- busca com debounce ---------- */
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/search/${encodeURIComponent(query.trim())}`,
        );

        if (res.status === 200) {
          setSuggestions(await res.json());
        } else {
          setSuggestions([]);
        }
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE);

    // limpa timeout quando componente desmontar
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  /* ---------- seleciona item ---------- */
  function handlePick(symbol: string) {
    setQuery(symbol);
    onChange(symbol);
    setSuggestions([]);
  }

  /* ---------- override de cores ---------- */
  const localTheme = {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      onSurface:        isDark ? '#FFFFF1' : '#1A1A1A',
      surfaceVariant:   isDark ? '#3A3A3A' : '#CFCFCF',
      onSurfaceVariant: isDark ? '#888' : '#888',
      placeholder:      isDark ? '#888' : '#888',
      background:       isDark ? '#1E1F24' : '#FFFFFF',
    },
  };

  return (
    <View>
      <ContainerInput title={title}>
        <TextInput
          mode="outlined"
          value={query}
          onChangeText={txt => {
            setQuery(txt);
            onChange(txt);          // mantemos react-hook-form em sincronia
          }}
          placeholder={placeholder}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          theme={localTheme}
          right={
            loading ? (
              <TextInput.Icon
                icon={() => (
                  <ActivityIndicator
                    style={{ marginRight: 8 }}
                    size={18}
                  />
                )}
              />
            ) : undefined
          }
        />
      </ContainerInput>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => item['1. symbol']}
          style={[
            styles.list,
            { backgroundColor: isDark ? '#2A2B31' : '#fff' },
          ]}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePick(item['1. symbol'])}>
              <List.Item
                title={item['1. symbol']}
                description={item['2. name']}
                titleStyle={{ color: isDark ? '#fff' : '#000' }}
                descriptionStyle={{ color: isDark ? '#ccc' : '#555' }}
              />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { flex: 1, height: 44, fontSize: 15 },
  list: {
    maxHeight: 200,
    borderWidth: 1, 
    borderColor: '#666',
    borderRadius: 6,
    ...Platform.select({ ios: { zIndex: 1 } }), // evita sobrepor teclado iOS
  },
});
