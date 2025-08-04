// app/home.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import { ThemeProvider } from '../src/context/ThemeContext';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
} from 'react-native-paper';

import ContainerMaster from '../src/components/ContainerMaster';
import Navbar from '../src/components/NavbarWallet';
import testarBusca from '../src/components/Hooks/FncBuscaTickers';

type Ticker = { symbol: string; name: string; type: string };

export default function Home() {
  const [search, setSearch] = useState('');           // texto do input
  const [lista, setLista] = useState<Ticker[]>([]);   // resultados
  const [showList, setShowList] = useState(false);    // controla drop-down

  /* dispara sempre que search mudar ------------------------- */
  useEffect(() => {
    const term = search.trim();
    if (term.length < 3) {
      setLista([]);
      return;
    }

    let active = true;
    (async () => {
      try {
        const res = await testarBusca(term); // [{symbol,name,type}, ...]
        if (active) setLista(res);
      } catch (e: any) {
        Alert.alert('Erro', e.message ?? String(e));
      }
    })();

    return () => {
      active = false;
    };
  }, [search]);

  /* quando usuário escolhe um item -------------------------- */
  const handleSelect = (item: Ticker) => {
    setSearch(item.symbol);  // preenche com o ticker (pode usar name se quiser)
    setShowList(false);      // esconde a lista
  };

  return (
    <ThemeProvider>
      <PaperProvider>
        <ContainerMaster>
          <Navbar />

          {/* ----- Campo de busca ----- */}
          <View style={{ padding: 16 }}>
            <TextInput
              label="Buscar ticker"
              value={search}
              onChangeText={(t) => {
                setSearch(t);
                setShowList(true); // reabre lista enquanto digita
              }}
              mode="outlined"
              style={styles.input}
            />
          </View>

          {/* ----- Drop-down manual ----- */}
          {showList && lista.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                data={lista}
                keyExtractor={(item) => item.symbol}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText}>
                      {item.name} — {item.symbol}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Exemplo: usar o valor escolhido ------------------ */}
          {search ? (
            <View style={{ padding: 16 }}>
              <Button mode="contained" onPress={() => Alert.alert(search)}>
                Usar "{search}"
              </Button>
            </View>
          ) : null}
        </ContainerMaster>
      </PaperProvider>
    </ThemeProvider>
  );
}

/* ------------------------ estilos ------------------------- */
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#1e1e1e',
  },
  dropdown: {
    backgroundColor: '#2b2b2b',
    borderWidth: 1,
    borderColor: '#7a5bff',
    borderRadius: 4,
    marginHorizontal: 16,
    maxHeight: 220,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    color: '#ffffff',
  },
});
