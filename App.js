import React, { useEffect } from 'react';
import { Alert, Dimensions, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Lyrics from './pages/lyrics/Lyrics';
import Cipher from './pages/cipher/Cipher';
import Search from './pages/search/Search';
import About from './pages/About/About';
import { AppearanceProvider } from 'react-native-appearance';
import { StatusBar } from 'expo-status-bar';
import Music from './components/Music/Music';
import * as NavigationBar from 'expo-navigation-bar';
import { typeDevice } from './utils/Index';
import { ToastProvider } from 'react-native-toast-notifications'
import { ButtonTitle, Wrapper } from './style';
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
                : '#0B97D3'
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
function AboutScreen({ navigation }) {
  return (
    <Wrapper>
      <About navigation={navigation} />
    </Wrapper>
  );
}

function HomeStackMusic({ navigation, route }) {
  const visible = route.params?.params.musicTitle.length < 25;
  const widthScreen = !visible ? Dimensions.get('window').width - 130 : null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Music" component={HomeScreen} options={{ title: 'Música', headerTitleAlign: 'center' }} />
      <Stack.Screen
        name="MusicLetter"
        component={Music}
        options={
          {
            title: route.params?.params.musicTitle,
            headerBackTitleVisible: visible,
            headerTitleAlign: 'center',
            headerBackTitleStyle: {
              fontSize: 13
            },
            headerTitleStyle: {
              width: widthScreen,
              textAlign: 'center',
              alignSelf: 'center',
            }
          }
        }
      />
    </Stack.Navigator>
  );
}

function SearchScreenStack({ navigation, route }) {
  const visible = route.params?.params.musicTitle.length < 25;
  const widthScreen = !visible ? Dimensions.get('window').width - 130 : null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SearchStack" component={SearchScreen} options={{ title: 'Buscar', headerTitleAlign: 'center' }} />
      <Stack.Screen
        name="MusicLetterSearch"
        component={Music}
        options={
          {
            title: route.params?.params.musicTitle,
            headerBackTitleVisible: visible,
            headerTitleAlign: 'center',
            headerBackTitleStyle: {
              fontSize: 13,
            },
            headerTitleStyle: {
              width: widthScreen,
              textAlign: 'center',
              alignSelf: 'center',
            }
          }
        }
      />
    </Stack.Navigator>
  );
}

export default function App() {

  if (typeDevice.Android()) {
    NavigationBar.setButtonStyleAsync("light");
    NavigationBar.setBackgroundColorAsync("#1A1A1A");
  }

  let heightScreen = null;

  if (Dimensions.get('window').height < 600) {
    heightScreen = Dimensions.get('window').height - 510
  }

  return (
    <ThemeProvider theme={themes.dark}>
      <ToastProvider>
        <AppearanceProvider>
          <StatusBar translucent={true} style={themes.dark.barColor} />
          <NavigationContainer theme={themes.dark}>
            <Tab.Navigator
              backBehavior='history'
              sceneContainerStyle={{ backgroundColor: themes.dark.background }}
              screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                // tabBarLabelStyle: {
                //   position: 'relative',
                //   bottom: 10
                // },
                // tabBarIconStyle: {
                //   bottom: 7,
                //   position: 'relative'
                // },
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
                tabBarActiveTintColor: '#0B97D3',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                  flex: heightScreen ? null : 0.08,
                  height: heightScreen ? heightScreen : null
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeStackMusic} options={{ headerShown: false, title: 'Música' }} />
              <Tab.Screen name="Cipher" component={CipherScreen} options={{ title: 'Cifras', headerTitleAlign: 'center' }} />
              <Tab.Screen name="Search" component={SearchScreenStack} options={{ headerShown: false, title: 'Buscar' }} />
              <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Mais', headerTitleAlign: 'center' }} />
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