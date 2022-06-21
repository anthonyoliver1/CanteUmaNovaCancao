import React, { useEffect, useState } from "react";
import { Alert, Image, Linking, Modal, Platform, ScrollView, Share, ToastAndroid, View } from "react-native";
import { typeDevice } from "../../utils/Index";
import * as WebBrowser from 'expo-web-browser';
import qs from 'qs';
import { RadioButton } from 'react-native-paper';
import { AboutButton, Container, ContainerModal, Description, ModalContent, ModalTitle, ModalWrapper, VersionApp, Wrapper } from "../../style/AboutStyle";
import { ButtonTitle } from "../../style";
import themes from "../../style/themes";

export default function About({ navigation }) {

    const [OS, setOS] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [valueTheme, setValueTheme] = useState('no-preference');

    useEffect(() => {
        switch (Platform.OS) {
            case 'android': setOS('Android')
                break;
            default: setOS('iOS')
                break
        }
    }, [])

    const share = async () => {
        try {
            if (typeDevice.mobile()) {
                const linkShare = typeDevice.iOS() ? '' : 'https://google.com.br'
                await Share.share({
                    message: 'Venha e Cante Uma Nova Canção com a gente!!' + `${"\n\n" + linkShare}`,
                    url: 'https://apple.com/br',
                    title: 'Cante Uma Nova Canção'
                });
                // if (result.action === Share.sharedAction) {
                //     if (result.activityType) {
                //         // shared with activity type of result.activityType
                //     } else {
                //         // shared
                //     }
                // } else if (result.action === Share.dismissedAction) {
                //     // dismissed
                // }
                return;
            }
        } catch (error) {
            alert(error.message);
        }
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

    // const changeTheme = (themeSelected) => {
    //     navigation.navigate(
    //         'About',
    //         {
    //             screen: 'About',
    //             themeColor: themeSelected,
    //         }
    //     )
    //     setValueTheme(themeSelected)
    // }

    return (
        <Container>
            <ScrollView>
                <Wrapper>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require('../../assets/top_logo.png')}
                    />
                    <Description>
                        Seja bem-vindo ao app Cante Uma Nova Canção.{"\n\n"}
                        Estamos muito felizes em ter você por aqui para adorarmos juntos o nosso Deus 😊 {"\n\n"}
                        Esperamos que tenha uma ótima experiência com nosso app! E para que possamos continuar melhorando e evoluindo contamos com seu feedback!
                    </Description>

                    <View>
                        <AboutButton style={
                            ({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? '#24b1ec'
                                        : '#5bc8f5'
                                }
                            ]
                        }
                            onPress={() => share()}
                        >
                            <ButtonTitle>Compartilhe</ButtonTitle>
                        </AboutButton>

                        <AboutButton style={
                            ({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? '#24b1ec'
                                        : '#5bc8f5'
                                }
                            ]
                        }
                            onPress={() => goToWebsite()}
                        >
                            <ButtonTitle>Visite nossa Igreja</ButtonTitle>
                        </AboutButton>

                        <AboutButton style={
                            ({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? '#24b1ec'
                                        : '#5bc8f5'
                                }
                            ]
                        } onPress={() => sendEmail()}>
                            <ButtonTitle>Contato</ButtonTitle>
                        </AboutButton>
                    </View>

                    {/* <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <ContainerModal>
                            <ModalWrapper>
                                <ModalTitle>Tema:</ModalTitle>
                                <ModalContent>
                                    <RadioButton.Group onValueChange={newValue => changeTheme(newValue)} value={valueTheme}>
                                        <RadioButton.Item label="Claro" value="light" mode="ios" labelStyle={{ color: '#ffff' }} />
                                        <RadioButton.Item label="Escuro" value="dark" mode="ios" labelStyle={{ color: '#ffff' }} />
                                        <RadioButton.Item label="Automático (Sistema)" value="no-preference" mode="ios" labelStyle={{ color: '#ffff' }} />
                                    </RadioButton.Group>
                                </ModalContent>

                                <AboutButton
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? '#24b1ec'
                                                : '#5bc8f5'
                                        }
                                    ]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <ButtonTitle>Ok</ButtonTitle>
                                </AboutButton>
                            </ModalWrapper>
                        </ContainerModal>
                    </Modal> */}

                    {/* <AboutButton
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? '#24b1ec'
                                    : '#5bc8f5'
                            }
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <ButtonTitle>Tema</ButtonTitle>
                    </AboutButton> */}

                    <VersionApp>
                        Versão 1.0.0 {"\n"}
                        OS: {OS}{"\n\n"}
                        Beta
                    </VersionApp>
                </Wrapper>
            </ScrollView >
        </Container>
    );
}
