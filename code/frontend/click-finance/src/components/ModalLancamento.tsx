// ModalLancamento.tsx
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Modal, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';
import Dropdown from './Dropdown';
import ContainerInput from './ContainerInput';
import InputDatePicker from './InputDatePicker';
import { useTheme } from '../context/ThemeContext';

const tiposAtivo = ['Ações', 'FIIs', 'ETFs', 'BDRs', 'ETFs Intern.', 'Stocks'];

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: any) => void;
};

export default function ModalLancamento({ visible, onDismiss, onSubmit }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const background = isDark ? '#1E1F24' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const labelColor = isDark ? '#ccc' : '#333';

  const [tipo, setTipo] = useState('Compra');
  const [tipoAtivo, setTipoAtivo] = useState('');
  const [ativo, setAtivo] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [preco, setPreco] = useState('');
  const [custos, setCustos] = useState('');
  const [data, setData] = useState('');   // OBS.: agora é string, não Date

  const valorTotal =
    (parseFloat(preco) || 0) * (parseInt(quantidade) || 0) + (parseFloat(custos) || 0);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.container, { backgroundColor: background }]}
      >
        <KeyboardAvoidingView>
          <Text style={[styles.title, { color: textColor }]}>Adicionar Ativo</Text>

          <RadioButton.Group onValueChange={setTipo} value={tipo}>
            <View style={styles.toggleRow}>
              <RadioButton.Item label="Compra" value="Compra" />
              <RadioButton.Item label="Venda" value="Venda" />
            </View>
          </RadioButton.Group>




          {/* -------- Linha 2 -------- */}
          <View style={styles.row}>

<InputDatePicker
  title="Data da compra"
  value={data}                 // data é string 'dd/mm/aaaa'
  onChange={setData}
/>



            <ContainerInput title="Preço Unitário">
              <TextInput
                placeholder='Ex: corretagem, taxas'
                mode="outlined"
                value={custos}
                onChangeText={setCustos}
                keyboardType="numeric"
                style={styles.textInput}
              />
            </ContainerInput>
          </View>


          {/* -------- Total -------- */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: labelColor }]}>Valor total</Text>
            <Text style={[styles.totalValue, { color: textColor }]}>
              R$ {valorTotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <Button onPress={onDismiss}>Cancelar</Button>
            <Button
              mode="contained"
              onPress={() =>
                onSubmit({ tipo, tipoAtivo, ativo, quantidade, preco, custos, data })
              }
            >
              Adicionar Ativo
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '95%',
    maxWidth: 620,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  inputHalf: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  totalRow: {
    marginTop: 20,
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
