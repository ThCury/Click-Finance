import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';          // nosso ThemeProvider
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import ThemeToggleButton from './ThemeToggleButton';
import BtnAdicionarLancamento from './BtnAdicionarLancamento';
import { useRouter, usePathname } from 'expo-router';

/**
 * Barra de navegação semelhante à do Investidor10.
 * - Ajusta cores conforme modo claro/escuro.
 * - Exibe logo, nome da carteira e ícones de ações.
 * - Para mobile (React Native) – largura total da tela.
 */
export default function NavbarWallet() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bg = isDark ? '#0F1115' : '#ffffff';
  const fg = isDark ? '#E5E5E5' : '#222';
  const router = useRouter();
  const pathname = usePathname();

  const handleRefresh = () => {
    router.replace(pathname as any);
  };

  return (
  <View style={[styles.container, { backgroundColor: bg }]}>
    {/* Topo da navbar */}
    <View style={styles.topRow}>
      {/* ---- Lado esquerdo ---- */}
      <View style={styles.left}>
        <Text style={[styles.logo, { color: fg }]}>
          Investidor<Text style={{ color: '#FFD180' }}>10</Text>
        </Text>

        <Pressable style={styles.walletBtn}>
          <Text style={[styles.walletText, { color: fg }]}>carteira GOBLIN</Text>
          <Feather name="chevron-down" size={16} color={fg} />
        </Pressable>
      </View>

      {/* ---- Lado direito ---- */}
      <View style={styles.right}>
        <Pressable style={styles.iconBtn} onPress={handleRefresh}>
          <Feather name="refresh-ccw" size={20} color={fg} />
        </Pressable>

        <Pressable style={styles.iconBtn}>
          <Feather name="eye" size={20} color={fg} />
        </Pressable>

        <ThemeToggleButton />

        <Pressable style={styles.iconBtn}>
          <Feather name="help-circle" size={20} color={fg} />
        </Pressable>

        <Pressable style={styles.avatarBox}>
          <Feather name="menu" size={18} color={fg} />
          <MaterialCommunityIcons
            name="account-circle"
            size={28}
            color={fg}
            style={{ marginLeft: 4 }}
          />
        </Pressable>
      </View>
    </View>

    {/* Botão adicionar lançamento */}
    <View style={{ marginTop: 10, marginLeft: 20, alignContent: 'flex-end' }}>
      <BtnAdicionarLancamento />
    </View>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
  width: '100%',
  paddingTop: 12,
  paddingHorizontal: 12,
  paddingBottom: 10,
  backgroundColor: '#fff',
  elevation: 4,
},
topRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
  },
  walletBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    fontSize: 16,
    marginRight: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  avatarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
