// app/home.tsx
import React from 'react';
import { ThemeProvider } from '../src/context/ThemeContext';
import { Provider as PaperProvider } from 'react-native-paper';

import ContainerMaster from '../src/components/ContainerMaster';
import Navbar from '../src/components/NavbarWallet';
import ContainerSmall from '../src/components/ContainerSmall';
import Section from '../src/components/Section';
import CardPatrimonio from '../src/components/CardPatrimonio';
import CardProvento from '../src/components/CardProvento';
import CardVariacao from '../src/components/CardVariacao';

export default function Home() {
  return (
    <PaperProvider>
      <ThemeProvider>
        <ContainerMaster>
          <Navbar />
          <Section direction="row" justify="space-between" align="flex-start">
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

            <ContainerSmall>
              <CardProvento
                icon="cash-multiple"
                title="Proventos recebidos (12M)"
                mainValue="R$ 584,18"
                subTitle="Proventos acumulados"
                subValue="R$ 769,87"
              />
            </ContainerSmall>

            <ContainerSmall>
              <CardVariacao
                icon="chart-line"
                titleLeft="Variação"
                titleRight="Rentabilidade"
                valueLeft="1,72%"
                subValueLeft="+ R$ 214,45"
                valueRight="32,86%"
                colorLeft="#22c55e"
              />
            </ContainerSmall>
          </Section>
        </ContainerMaster>
      </ThemeProvider>
    </PaperProvider>
  );
}
