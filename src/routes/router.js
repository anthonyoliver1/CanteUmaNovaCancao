import React from 'react';
import Lyrics from '../pages/Lyrics';
import Cipher from '../pages/Cipher';
import Search from '../pages/Search';
import About from '../pages/About';
import Music from '../components/Music';
import themes from '../style/themes';
import MusicCipher from '../components/MusicCipher';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Dimensions } from 'react-native';
import { typeDevice } from '../utils';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Wrapper } from '../../style';
import * as NavigationBar from 'expo-navigation-bar';

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
    return (
        <Wrapper>
            <Cipher navigation={navigation} />
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

function HomeStackMusic({ route }) {
    const visible = route.params?.params.musicTitle.length < 25;
    const widthScreen = !visible ? Dimensions.get('window').width - 130 : null;

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="Music"
                component={HomeScreen}
                options={
                    {
                        title: 'Música',
                        headerTitleAlign: 'center'
                    }
                }
            />
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

function SearchScreenStack({ route }) {
    const visible = route.params?.params.musicTitle.length < 25;
    const widthScreen = !visible ? Dimensions.get('window').width - 130 : null;

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="SearchStack"
                component={SearchScreen}
                options={
                    {
                        title: 'Buscar',
                        headerTitleAlign: 'center'
                    }
                }
            />
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

function CipherScreenStack({ route }) {
    const visible = route.params?.params.musicTitle.length < 25;
    const widthScreen = !visible ? Dimensions.get('window').width - 130 : null;

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="CipherStack"
                component={CipherScreen}
                options={
                    {
                        title: 'Cifras',
                        headerTitleAlign: 'center'
                    }
                }
            />
            <Stack.Screen
                name="MusicCipher"
                component={MusicCipher}
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

export default function Router() {
    let heightScreen = null;

    if (Dimensions.get('window').height < 600) {
        heightScreen = Dimensions.get('window').height - 510;
    }

    if (typeDevice.Android()) {
        NavigationBar.setButtonStyleAsync("light");
        NavigationBar.setBackgroundColorAsync("#1A1A1A");
    }

    return (
        <ThemeProvider theme={themes.dark}>
            <StatusBar translucent={true} style={themes.dark.barColor} />
            <NavigationContainer theme={themes.dark}>
                <Tab.Navigator
                    backBehavior='history'
                    sceneContainerStyle={{ backgroundColor: themes.dark.background }}
                    screenOptions={({ route }) => ({
                        tabBarHideOnKeyboard: typeDevice.Android(),
                        tabBarLabelPosition: 'below-icon',
                        tabBarLabelStyle: {
                            position: 'relative',
                            bottom: 4,
                            width: '100%'
                        },
                        tabBarIconStyle: {
                            bottom: -1,
                            position: 'relative'
                        },
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
                            height: heightScreen
                        },
                    })}
                >
                    <Tab.Screen name="Home" component={HomeStackMusic} options={{ headerShown: false, title: 'Música' }} />
                    <Tab.Screen name="Cipher" component={CipherScreenStack} options={{ headerShown: false, title: 'Cifras' }} />
                    <Tab.Screen name="Search" component={SearchScreenStack} options={{ headerShown: false, title: 'Buscar' }} />
                    <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Mais', headerTitleAlign: 'center' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    )
}