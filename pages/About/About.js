import React, { useEffect, useState } from "react";
import { Alert, Image, Linking, Modal, Platform, Pressable, SafeAreaView, ScrollView, Share, StatusBar, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { typeDevice } from "../../utils/Index";
import appleBadge from "../../assets/app-store-badge.svg";
import { useTheme } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import qs from 'qs';
import { RadioButton } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import Constants from 'expo-constants';



export default function About({ navigation }) {
    const { colors } = useTheme();
    const scheme = useColorScheme();

    const [typeStyle, setTypeStyle] = useState([]);
    const [OS, setOS] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [valueTheme, setValueTheme] = useState('no-preference');
    const [themeModal, setThemeModal] = useState('')


    useEffect(() => {
        scheme === 'dark' ? setThemeModal('#222') : setThemeModal('#fff')

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

    async function sendEmail() {
        const to = 'teste@teste.com'

        const query = qs.stringify({
            subject: '',
            body: '',
            cc: '',
            bcc: ''
        });

        let url = `mailto:${to}?${query}`;

        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
            typeDevice.iOS() ?
                Alert.alert('Houve um erro', 'Não foi possível abrir o seu app de email', [
                    {
                        text: 'Fechar'
                    }
                ])
                : ToastAndroid.show('Não foi possível abrir o seu app de Email', ToastAndroid.LONG)
        }

        return Linking.openURL(url);
    }

    const changeTheme = (themeSelected) => {
        navigation.navigate(
            'About',
            {
                screen: 'About',
                themeColor: themeSelected,
            }
        )
        setValueTheme(themeSelected)
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView style={typeStyle}>
                <View style={[style.view]}>
                    <Text style={{ color: colors.text, marginBottom: 10 }}>
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

                                <Pressable style={
                                    ({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? '#24b1ec'
                                                : '#5bc8f5'
                                        },
                                        style.button
                                    ]
                                } onPress={() => sendEmail()}>
                                    <Text style={[style.textStyle]}>Contato</Text>
                                </Pressable>
                            </View>
                            : // Web
                            <View style={[style.fieldButtons]}>
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

                                <Pressable style={
                                    ({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? '#24b1ec'
                                                : '#5bc8f5'
                                        },
                                        style.button
                                    ]
                                } onPress={() => sendEmail()}>
                                    <Text style={[style.textStyle]}>Contato</Text>
                                </Pressable>
                            </View>
                    }

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={style.centeredView}>
                            <View style={[style.modalView, { backgroundColor: themeModal }]}>
                                <Text style={[style.modalTitle, { color: colors.text }]}>Tema:</Text>
                                <View style={[style.contentModal]}>
                                    <RadioButton.Group onValueChange={newValue => changeTheme(newValue)} value={valueTheme}>
                                        {/* <RadioButton.Item label="Claro" value="light" mode="ios" labelStyle={{ color: colors.text }} /> */}
                                        {/* <RadioButton.Item label="Escuro" value="dark" mode="ios" labelStyle={{ color: colors.text }} /> */}
                                        <RadioButton.Item label="Automático (Sistema)" value="no-preference" mode="ios" labelStyle={{ color: colors.text }} />
                                    </RadioButton.Group>
                                </View>
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? '#24b1ec'
                                                : '#5bc8f5'
                                        },
                                        style.button
                                    ]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={style.textStyle}>Ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? '#24b1ec'
                                    : '#5bc8f5'
                            },
                            style.button
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={style.textStyle}>Tema</Text>
                    </Pressable>

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
        width: 160,
        marginBottom: 10,
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
        marginTop: 20,
    },
    fieldButtons: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000096'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: typeDevice.web() ? "30vw" : "80%",
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "700",
    },
    contentModal: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
    },
    radioButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    }
})