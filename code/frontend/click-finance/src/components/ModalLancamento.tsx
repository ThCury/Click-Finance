import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Modal, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';

import { useTheme } from '../context/ThemeContext';

import InputDatePicker from './InputDatePicker';
import InputNumber from './InputNumber';
import InputText from './InputText';
import AutoFillTicker from './AutoFillTicker';

import ContainerInput from './ContainerInput';
import Dropdown from './Dropdown';
import { moneyApplyMask } from './Utils/Masks/index';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: any) => void;
};

export function ModalLancamento({ visible, onDismiss, onSubmit }: Props) {
  //#region Constantes e Funções
  const { theme } = useTheme();
  const tiposAtivo = ['Ações', 'FIIs', 'ETFs', 'BDRs', 'ETFs Intern.', 'Stocks'];
  const hoje = new Date().toLocaleDateString('pt-BR'); // "09/07/2025"

  const isDark = theme === 'dark';
  const background = isDark ? '#1E1F24' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const labelColor = isDark ? '#ccc' : '#333';
  const totalBg = isDark ? '#2A2B31' : '#F1F1F1';


  const [tipo, setTipo] = useState('Compra');
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      dataCompra: hoje,
      custos: '',
      preco: '',
      quantidade: '1',
      tipoAtivo: '',
      ativo: '',
    },
  });

  const moneyToNumber = (s: string) => Number(s.replace(/\./g, '').replace(',', '.')) || 0;
  const valorTotal =
    moneyToNumber(watch('preco')) *
      (parseFloat(watch('quantidade')) || 0) +
    moneyToNumber(watch('custos'));

  function onMoneyChange(value: string) {
    const maskedValue = moneyApplyMask(value);
    setValue('preco',maskedValue);
  }
  function onAtivoChange(value: string) {
    setValue('ativo',value);
    console.log('Ativo selecionado:', value);
    
  }

  //#endregion

  //#region View
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

          {/* -------- Linha 1 -------- */}
          <View style={styles.row}>
            {/* Data da compra */}
            <Controller
              control={control}
              name="dataCompra"
              rules={{ pattern: /^\d{2}\/\d{2}\/\d{4}$/, required: true }}
              render={({ field: { value, onChange } }) => (
                <InputDatePicker
                  title="Data da compra"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {/* Ativo  autofill*/}
            <Controller
              control={control}
              name="ativo"
              //rules={{ pattern: /^\d{2}\/\d{2}\/\d{4}$/, required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  title="Nome do Ativo"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          


          </View>

         {/* -------- Linha 3 -------- */}
          <View style={styles.row}>
            {/* Preço */}
            <Controller
              control={control}
              name="preco"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputNumber
                  title="Preço em R$"
                  value={value}
                  onChange={(v) => onMoneyChange(v)} // Use the custom masking function
                  prefix="R$"
                  placeholder="0,00"
                />
              )}
            />
            
            {/* Quantidade */}
            <Controller
              control={control}
              name="quantidade"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputNumber
                  title="Quantidade"
                  value={value}
                  onChange={onChange}
                  placeholder="100"
                  // style={styles.inputHalf}
                />
              )}
            />
          </View>

          {/* -------- Total -------- */}
          <View style={[styles.totalRow, { backgroundColor: totalBg }]}>
            <Text style={[styles.totalLabel, { color: labelColor }]}>Valor total</Text>
            <Text style={[styles.totalValue, { color: textColor }]}>
              R$ {valorTotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <Button onPress={onDismiss}>Cancelar</Button>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Adicionar Ativo
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );

  //#endregion
}

//#region Styles
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

//#endregion