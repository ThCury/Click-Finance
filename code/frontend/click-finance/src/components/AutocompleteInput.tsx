// src/components/AutocompleteTickerInput.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { TextInput, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

/* ---------- tipos --------------------------------------- */
type Ticker = { symbol: string; name: string; type: string };

interface Props {
  label?: string;
  value: string;
  onSelect: (ticker: string) => void; // devolve apenas o símbolo escolhido
  placeholder?: string;
  minLength?: number;
}

const BASE_URL = 'http://127.0.0.1:8000/api'; // ajuste p/ produção

/* ---------- componente ---------------------------------- */
export default function AutocompleteInput({
  label = 'Buscar ticker',
  value,
  onSelect,
  placeholder = '',
  minLength = 3,
}: Props) {
  const [query, setQuery]   = useState(value);
  const [options, setOpts]  = useState<Ticker[]>([]);
  const [open, setOpen]     = useState(false);

  /* —— temas ———————————————————————————————— */
  const { theme }  = useTheme();
  const isDark     = theme === 'dark';
  const paperTheme = usePaperTheme();

  const localTheme = {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      onSurface:        isDark ? '#F1F1F1' : '#1A1A1A',
      background:       isDark ? '#1E1F24' : '#FFFFFF',
      surfaceVariant:   isDark ? '#333'   : '#DDD',
      onSurfaceVariant: isDark ? '#AAA'   : '#666',
      placeholder:      isDark ? '#AAA'   : '#666',
    },
  };

  /* —— fetch com debounce mínimo ——————————————— */
  const searchTickers = useCallback(
    async (text: string) => {
      if (text.trim().length < minLength) {
        setOpts([]);
        return;
      }
      try {
        const res = await fetch(
          `${BASE_URL}/search/${encodeURIComponent(text.trim())}`,
        );
        if (res.status === 200) {
          setOpts(await res.json());
        } else {
          setOpts([]);
        }
      } catch (e) {
        console.warn('Falha na busca', e);
        setOpts([]);
      }
    },
    [minLength],
  );

  /* —— disparo a cada mudança de query ——————————— */
  useEffect(() => {
    searchTickers(query);
  }, [query, searchTickers]);

  /* —— clique em uma opção ———————————————— */
  function handleSelect(item: Ticker) {
    setQuery(item.symbol);
    setOpen(false);
    setOpts([]);
    onSelect(item.symbol);
  }

  /* —— render ———————————————————————————————— */
  return (
    <View style={styles.wrapper}>
      <TextInput
        label={label}
        mode="outlined"
        value={query}
        onChangeText={(txt) => {
          setQuery(txt);
          setOpen(true);
        }}
        placeholder={placeholder}
        outlineStyle={{ borderRadius: 8 }}
        style={styles.input}
        theme={localTheme}
      />

      {open && options.length > 0 && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: isDark ? '#2B2B2B' : '#FFFFFF',
              borderColor:     isDark ? '#7a5bff' : '#6200ee',
            },
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={(it) => it.symbol}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                android_ripple={{ color: isDark ? '#444' : '#E0E0E0' }}
                style={({ hovered }) => [
                  styles.option,
                  hovered && {
                    backgroundColor: isDark ? '#3B3B3B' : '#EEEEEE',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    { color: isDark ? '#FFF' : '#000' },
                  ]}
                >
                  {item.name} — {item.symbol}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}

/* ---------- estilos base -------------------------------- */
const styles = StyleSheet.create({
  wrapper: { width: '100%', zIndex: 10 },
  input:   { fontSize: 15 },
  dropdown: {
    maxHeight: 220,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
  },
  option: { paddingVertical: 10, paddingHorizontal: 12 },
  text:   { fontSize: 14 },
});
