// ModalLancamento.tsx
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dropdown from './Dropdown';

const tiposAtivo = ['Ações', 'FIIs', 'ETFs', 'BDRs', 'ETFs Intern.', 'Stocks'];

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: any) => void;
};

export default function ModalLancamento({ visible, onDismiss, onSubmit }: Props) {
  const [tipo, setTipo] = useState('Compra');
  const [tipoAtivo, setTipoAtivo] = useState('');
  const [ativo, setAtivo] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [preco, setPreco] = useState('');
  const [custos, setCustos] = useState('');
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const valorTotal = (parseFloat(preco) || 0) * (parseInt(quantidade) || 0) + (parseFloat(custos) || 0);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.title}>Adicionar Ativo</Text>

          <RadioButton.Group onValueChange={setTipo} value={tipo}>
            <View style={styles.toggleRow}>
              <RadioButton.Item label="Compra" value="Compra" />
              <RadioButton.Item label="Venda" value="Venda" />
            </View>
          </RadioButton.Group>

          <Dropdown
            label="Tipo de ativo"
            value={tipoAtivo}
            onSelect={setTipoAtivo}
            options={tiposAtivo.map(t => ({ label: t, value: t }))}
        />


          <TextInput
            label="Ativo"
            value={ativo}
            onChangeText={setAtivo}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Data da compra"
            value={data.toLocaleDateString()}
            mode="outlined"
            style={styles.input}
            onFocus={() => setShowDatePicker(true)}
          />
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={data}
            onConfirm={d => {
              setShowDatePicker(false);
              setData(d);
            }}
            onCancel={() => setShowDatePicker(false)}
          />

          <View style={styles.row}>
            <TextInput
              label="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
              mode="outlined"
              style={styles.inputHalf}
            />
            <TextInput
              label="Preço em R$"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
              mode="outlined"
              style={styles.inputHalf}
            />
          </View>

          <TextInput
            label="Outros custos"
            value={custos}
            onChangeText={setCustos}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Valor total</Text>
            <Text style={styles.totalValue}>R$ {valorTotal.toFixed(2)}</Text>
          </View>

          <View style={styles.buttonRow}>
            <Button onPress={onDismiss}>Cancelar</Button>
            <Button mode="contained" onPress={() => onSubmit({ tipo, tipoAtivo, ativo, quantidade, preco, custos, data })}>
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
    backgroundColor: '#1E1F24',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    marginVertical: 8,
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: '#ccc',
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
