import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/theme';
import Home from './src/screens/Home';
import { Inter_300Light, Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { Image } from 'react-native';

import TestScreen1 from './src/screens/TestScreen1';
import TestScreen2 from './src/screens/TestScreen2';
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
              <Tab.Navigator screenOptions={{ headerShown: false,
                tabBarStyle: {
                  backgroundColor: '#e6e6e6', 
                  borderTopWidth: 0, 
                  elevation: 0, 
                  shadowOpacity: 0, 
                  height: 105,
                },
                tabBarShowLabel: false,
                tabBarIconStyle: {
                  marginTop: 20, 
                },
               }}>
                <Tab.Screen name="Home" component={Home} 
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={focused ? require('./assets/home2.png') : require('./assets/home.png')}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  ),
                }}/>
                <Tab.Screen name="TesteScreen1" component={TestScreen1} 
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={focused ? require('./assets/add2.png') : require('./assets/add.png')}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  ),
                }}/>
                <Tab.Screen name="TesteScreen2" component={TestScreen2} 
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={focused ? require('./assets/user2.png') : require('./assets/user.png')}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  ),
                }}/>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}