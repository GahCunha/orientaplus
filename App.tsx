import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/theme';
import Home from './src/Home';
import { Inter_300Light, Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_300Light,
    Roboto_700Bold,
    Roboto_100Thin,
  });
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <Home />
      </ThemeProvider>
    </>
  );
}
