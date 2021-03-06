import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import Lyrics from './pages/lyrics/Lyrics';
import Cipher from './pages/cipher/Cipher';
import Search from './pages/search/Search';
import About from './pages/About/About';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { StatusBar } from 'expo-status-bar';
import Music from './components/Music/Music';
import * as NavigationBar from 'expo-navigation-bar';
import { typeDevice } from './utils/Index';
import { ToastProvider } from 'react-native-toast-notifications'
import { ButtonTitle, Title, Wrapper } from './style';
import { ThemeProvider } from 'styled-components';
import themes from './style/themes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <Wrapper>
      <Lyrics navigation={navigation} />
    </Wrapper>
  );
}

function CipherScreen({ navigation }) {
  Alert.alert('Em breve!', 'Logo logo teremos cifras 🎉', [
    {
      text: 'Fechar',
      onPress: () => navigation.navigate('Home')
    }
  ])

  return (
    <Wrapper>
      <Pressable
        onPress={() => navigation.navigate('Music')}
        style={
          ({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#24b1ec'
                : '#5bc8f5'
            },
            style.button
          ]
        }
      >
        <ButtonTitle>Ir para Música</ButtonTitle>
      </Pressable>
      <Cipher />
    </Wrapper >
  );
}

function SearchScreen({ navigation }) {
  return (
    <Wrapper>
      <Search navigation={navigation} />
    </Wrapper>
  );
}
function AboutScreen({ navigation, route }) {
  // userTheme = route.params?.themeColor
  return (
    <Wrapper>
      <About navigation={navigation} />
    </Wrapper>
  );
}

function HomeStackMusic({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Music" component={HomeScreen} options={{ title: 'Música' }} />
      <Stack.Screen
        name="MusicLetter"
        component={Music}
        options={
          {
            title: route.params?.params.musicTitle,
            headerBackTitle: 'Voltar',
          }
        }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const myTheme = themes[scheme] || themes.dark;

  useEffect(() => {
    if (typeDevice.Android()) {
      if (scheme === 'dark') {
        NavigationBar.setBackgroundColorAsync("#121212");
        NavigationBar.setButtonStyleAsync("light");
        return;
      }

      NavigationBar.setBackgroundColorAsync("#FFFFFF");
      NavigationBar.setButtonStyleAsync("dark");
      return;
    }
  }, [scheme])

  return (
    <ThemeProvider theme={myTheme}>
      <ToastProvider>
        <AppearanceProvider>
          <StatusBar translucent={true} style={myTheme.barColor} />
          <NavigationContainer theme={myTheme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'musical-notes'
                      : 'musical-notes-outline';
                  } else if (route.name === 'Cipher') {
                    iconName = focused ? 'book' : 'book-outline';
                  } else if (route.name === 'Search') {
                    iconName = focused ? 'md-search' : 'md-search-outline'
                  } else if (route.name === 'About') {
                    iconName = focused ? 'menu' : 'menu-outline'
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#5bc8f5',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                  overflow: 'hidden'
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeStackMusic} options={{ headerShown: false, title: 'Música' }} />
              <Tab.Screen name="Cipher" component={CipherScreen} options={{ title: 'Cifras' }} />
              <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar' }} />
              <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Mais' }} />
            </Tab.Navigator>
          </NavigationContainer>
        </AppearanceProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    marginBottom: 10,
    marginTop: 20,
  },
});