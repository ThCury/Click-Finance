// components/InputDatePicker.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTheme } from '../context/ThemeContext';

type Props = {
  value:      Date | null;
  onSelect:   (d: Date) => void;
  placeholder?: string;
};

export default function InputDatePicker({
  value,
  onSelect,
  placeholder = '__/__/____',
}: Props) {
  const { theme } = useTheme();
  const isDark   = theme === 'dark';

  const [open,   setOpen]   = useState(false);
  const [focus,  setFocus]  = useState(false);

  /* ---------- cores ----------- */
  const txtColor  = isDark ? '#f2f2f2' : '#0d0d0d';
  const hintColor = isDark ? '#7a7a7a' : '#9e9e9e';
  const glowColor = '#8ab4f8';

  /* ---------- handlers -------- */
  function show() {
    setFocus(true);
    setOpen(true);
  }
  function hide() {
    setOpen(false);
    setFocus(false);
  }

  return (
    <>
      <Pressable style={styles.row} onPress={show}>
        <Feather name="calendar" size={18} color={hintColor} style={{ marginRight: 8 }} />
        <Text style={[
          styles.text,
          { color: value ? txtColor : hintColor },
        ]}>
          {value ? value.toLocaleDateString('pt-BR') : placeholder}
        </Text>

        {/* overlay de foco */}
        {focus && (
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              styles.overlay,
              { borderColor: glowColor },
            ]}
          />
        )}
      </Pressable>

      <DateTimePickerModal
        isVisible={open}
        mode="date"
        date={value ?? new Date()}
        onConfirm={(d) => { onSelect(d); hide(); }}
        onCancel={hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
  },
  text: { fontSize: 15 },

  /** borda brilhante */
  overlay: {
    borderWidth: 2,
    borderRadius: 8,
  },
});
