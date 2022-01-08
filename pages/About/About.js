import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, SafeAreaView, ScrollView, Share, StatusBar, StyleSheet, Text, View } from "react-native";
import { typeDevice } from "../../utils/Index";
import appleBadge from "../../assets/app-store-badge.svg";
import { useTheme } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';


export default function About() {
    const { colors } = useTheme();

    const [typeStyle, setTypeStyle] = useState([]);
    const [OS, setOS] = useState('')

    useEffect(() => {
        switch (Platform.OS) {
            case 'android': setOS('Android')
                break;
            case 'ios': setOS('iOS')
                break
            default: setOS('Web')
                break
        }


        if (typeDevice.web())
            return setTypeStyle(style.web);

    }, [])

    const share = async () => {
        try {
            if (typeDevice.mobile()) {
                const linkShare = typeDevice.iOS() ? '' : 'https://google.com.br'
                const result = await Share.share({
                    message: 'Venha e Cante Uma Nova Canção com a gente!!' + `${"\n\n" + linkShare}`,
                    url: 'https://apple.com/br',
                    title: 'Cante Uma Nova Canção'
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
                return;
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function goToStore(store) {
        if (store === 'google')
            return window.open('https://google.com.br/', '_blank')

        return window.open('https://apple.com/br', '_blank')
    }

    const goToWebsite = async () => {
        await WebBrowser.openBrowserAsync('https://www.icisp.org.br/')
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView style={typeStyle}>
                <View style={[style.view]}>
                    <Text style={{ color: colors.text }}>
                        Seja bem-vindo ao app Cante Uma Nova Canção!{"\n\n"}
                        Ficamos muito felizes em ver você usando esse App para adorar a Deus junto com a gente 😊 {"\n\n"}
                        Espero que você goste de usar e nos envie feedback para sempre melhorarmos!!
                    </Text>

                    {
                        typeDevice.mobile() ?
                            <View>
                                <Pressable style={
                                    ({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? '#24b1ec'
                                                : '#5bc8f5'
                                        },
                                        style.button
                                    ]
                                }
                                    onPress={() => share()}
                                >
                                    <Text style={[style.textStyle]}>Compartilhe!</Text>
                                </Pressable>

                                <Pressable style={
                                ({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? '#24b1ec'
                                            : '#5bc8f5'
                                    },
                                    style.button
                                ]
                            }
                                onPress={() => goToWebsite()}
                            >
                                <Text style={[style.textStyle]}>Visite nossa Igreja!</Text>
                            </Pressable>
                            </View>
                            :
                            <View style={[style.viewBadges]}>
                                <Pressable onPress={() => goToStore('apple')}>
                                    <Image
                                        style={style.badgeApple}
                                        source={{ uri: appleBadge }}
                                    />
                                </Pressable>

                                <Pressable onPress={() => goToStore('google')}>
                                    <Image
                                        style={style.badgeGoogle}
                                        source={require('../../assets/google-play-badge.png')}
                                    />
                                </Pressable>
                            </View>
                    }
                    <Text style={[style.viewVersion]}>Versão 1.0.0 {"\n"}
                        OS: {OS + "\n\n"}
                        Densenvolvido por:{"\n"}
                        Anthony Oliveira{"\n"}
                        Fabio Ferreira
                    </Text>
                </View>
            </ScrollView >
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        minWidth: '100%'
    },
    viewVersion: {
        alignItems: "flex-end",
        color: '#ffff',
        textAlign: "center",
        padding: 20,
        marginTop: 60,
        backgroundColor: 'darkgray',
        borderRadius: 20,
        elevation: 2,
        overflow: "hidden"
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    web: {
        width: '100vw'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        marginBottom: 10,
        marginTop: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    badgeApple: {
        width: 180,
        height: 60,
    },
    badgeGoogle: {
        width: 200,
        height: 87,
    },
    viewBadges: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        top: 30,
    }

})