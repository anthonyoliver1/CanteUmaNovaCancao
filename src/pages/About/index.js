import React from "react";
import { Alert, Image, Linking, ScrollView, Share, ToastAndroid, View } from "react-native";
import { AboutButton, Container, Description, VersionApp, Wrapper } from "../../style/AboutStyle";
import { OsDevice, typeDevice } from "../../utils";
import { B, ButtonTitle } from "../../../style";
import appInfo from "../../../app.json";
import * as WebBrowser from 'expo-web-browser';
import qs from 'qs';

export default function About({ navigation }) {
    const share = async () => {
        try {
            if (typeDevice.mobile()) {
                const linkShare = typeDevice.iOS() ? '' : 'https://google.com.br';
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
        await WebBrowser.openBrowserAsync('https://www.icisp.org.br/');
    }

    async function sendEmail() {
        const to = 'anthony.silvaoliveira@outlook.com';

        const query = qs.stringify({
            subject: 'Cante Uma Nova Canção',
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
                : ToastAndroid.show('Não foi possível abrir o seu app de Email', ToastAndroid.LONG);
        }

        return Linking.openURL(url);
    }

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
                                        : '#0B97D3'
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
                                        : '#0B97D3'
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
                                        : '#0B97D3'
                                }
                            ]
                        } onPress={() => sendEmail()}>
                            <ButtonTitle>Contato</ButtonTitle>
                        </AboutButton>
                    </View>
                    <VersionApp>
                        Versão: <B>{appInfo.expo.version}</B> {"\n"}
                        OS: <B>{OsDevice()}</B>{"\n\n"}
                        Beta
                        {/* <Text style={{fontSize: 30}}>🎧</Text> */}
                    </VersionApp>
                </Wrapper>
            </ScrollView >
        </Container>
    );
}