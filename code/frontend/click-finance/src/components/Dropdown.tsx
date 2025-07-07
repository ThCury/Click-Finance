// components/Dropdown.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onSelect: (val: string) => void;
};

export default function Dropdown({ label, value, options, onSelect }: Props) {
  const [visible, setVisible] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || '';

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableRipple onPress={() => setVisible(true)}>
            <View pointerEvents="none">
              <TextInput
                label={label}
                value={selectedLabel}
                mode="outlined"
                editable={false}
              />
            </View>
          </TouchableRipple>
        }>
        {options.map(opt => (
          <Menu.Item
            key={opt.value}
            onPress={() => {
              onSelect(opt.value);
              setVisible(false);
            }}
            title={opt.label}
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
