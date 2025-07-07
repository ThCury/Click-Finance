import React from 'react';

import { ThemeProvider }     from '../src/context/ThemeContext';
import { Provider as PaperProvider } from 'react-native-paper';

import ContainerMaster       from '../src/components/ContainerMaster';
import Navbar                from '../src/components/NavbarWallet';
import ContainerSmall        from '../src/components/ContainerSmall';
import Section               from '../src/components/Section';
import CardPatrimonio        from '../src/components/CardPatrimonio';
import CardProvento        from '../src/components/CardProvento';
import CardVariacao        from '../src/components/CardVariacao';

import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AppEntry() {
  return (
  <PaperProvider>

    <ThemeProvider>
      <ContainerMaster>
        <Navbar />

        <Section direction="row" justify="space-between" align="flex-start" >
          
          {/* Card 1: Patrimônio Real */}
          <ContainerSmall>
            <CardPatrimonio
              icon="piggy-bank"
              title="Patrimônio real"
              mainValue="R$ 12.714,18"
              badgeValue="2%"
              badgeIcon="arrow-up"
              subTitle="Valor investido"
              subValue="R$ 12.499,73"
            />
          </ContainerSmall>
          {/* Card 2: Proventos */}
          <ContainerSmall>
            <CardProvento
              icon="cash-multiple"
              title="Proventos recebidos (12M)"
              mainValue="R$ 584,18"
              subTitle="Proventos acumulados"
              subValue="R$ 769,87"
            />
          </ContainerSmall>
          {/* Card 2: Variação */}
          <ContainerSmall>
            <CardVariacao
              icon="chart-line"
              titleLeft="Variação"
              titleRight="Rentabilidade"
              valueLeft="1,72%"
              subValueLeft="+ R$ 214,45"
              valueRight="32,86%"
              colorLeft="#22c55e" // ou "green", ou qualquer outro valor válido
            />
          </ContainerSmall>

        </Section>
      </ContainerMaster>
    </ThemeProvider>
      </PaperProvider>

  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginLeft: 6,
  },
  valorPrincipal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 4,
  },
  valorSecundario: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  subtitulo: {
    fontSize: 13,
    color: '#888',
    marginTop: 12,
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 6,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#000',
  },
});
