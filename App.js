import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Lyrics from './pages/lyrics/Lyrics';
import Cipher from './pages/cipher/Cipher';
import Search from './pages/search/Search';
import About from './pages/About/About';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Lyrics />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Cipher />
    </View>
  );
}

function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Search />
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Button title='FOI' onPress={() => navigation.navigate('Buscar')}/> */}
      <About />
    </View>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Música') {
                iconName = focused
                  ? 'musical-notes'
                  : 'musical-notes-outline';
              } else if (route.name === 'Cifras') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Buscar') {
                iconName = focused ? 'md-search' : 'md-search-outline'
              } else if (route.name === 'Sobre') {
                iconName = focused ? 'alert-circle' : 'alert-circle-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Música" component={HomeScreen} />
          <Tab.Screen name="Cifras" component={SettingsScreen} />
          <Tab.Screen name="Buscar" component={SearchScreen} />
          <Tab.Screen name="Sobre" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
