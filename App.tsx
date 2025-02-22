import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/theme';
import Home from './src/screens/Home';
import { Inter_300Light, Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';

import TestScreen1 from './src/screens/TestScreen1';
import TestScreen2 from './src/screens/TestScreen2';
import TestScreen3 from './src/screens/TestScreen3';
import LoginScreen from './src/screens/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main">
            {() => (
              <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="TesteScreen1" component={TestScreen1} />
                <Tab.Screen name="TesteScreen2" component={TestScreen2} />
                <Tab.Screen name="TesteScreen3" component={TestScreen3} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}