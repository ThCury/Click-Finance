import { ThemeProvider } from '../src/context/ThemeContext';
import AppNavigator from '../src/navigation';
import ContainerMaster from '';

export default function App() {
  return (
    <ThemeProvider>
      <ContainerMaster>
        <AppNavigator />
      </ContainerMaster>
    </ThemeProvider>
  );
}
