import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppName, Container, Subtitle, Title, Wrapper } from "../../style/TermsAndPrivacyStyle";
import { useToast } from "react-native-toast-notifications";
import qs from 'qs';

export default function TermsOfUse() {
    const { show } = useToast();

    async function sendEmail() {
        try {
            const to = 'anthony.silvaoliveira@outlook.com';
            const body = 'Olá, \n\n Estou com dúvidas sobre os Termos de Uso do Cante Uma Nova Canção,\n pode me ajudar ? \n\n Obrigado(a).';

            const query = qs.stringify({
                subject: 'Cante Uma Nova Canção',
                body,
                cc: '',
                bcc: ''
            });

            let url = `mailto:${to}?${query}`;

            const canOpen = await Linking.canOpenURL(url);

            if (!canOpen) {
                show('Não foi possível abrir o seu app de email', { type: 'danger' });
            }

            return Linking.openURL(url);

        } catch (error) {
            show('Ops! Houve um erro ao abrir o seu app de email', { type: 'danger' });
        }
    }
    const link = () => Linking.openURL('https://policies.google.com/?hl=pt');

    const goTo = (fun, value) => (
        <View>
            <TouchableOpacity onPress={() => fun()}>
                <AppName isLink>{value}</AppName>
            </TouchableOpacity>
        </View>
    );

    return (
        <Container>
            <ScrollView>
                <Wrapper>
                    <Title>Termos de Uso</Title>{"\n\n"}
                    <Text>
                        Seja bem-vindo ao <AppName>"Cante Uma Nova Canção"</AppName>!{"\n"}
                        Por favor, leia atentamente os termos antes de usar o aplicativo.
                        Ao usar o aplicativo, você concorda com estes termos de uso.

                    </Text>{"\n\n"}

                    <Subtitle>1. Uso do aplicativo </Subtitle>{"\n\n"}
                    <Text>
                        O aplicativo <AppName>"Cante Uma Nova Canção"</AppName> permite que você cante suas músicas favoritas e as compartilhe com seus amigos.
                        Você pode usar o aplicativo apenas para fins pessoais, e não comerciais.
                        Você não pode usar o aplicativo para violar a lei ou os direitos de terceiros.
                    </Text>{"\n\n"}

                    <Subtitle>2. Direitos autorais</Subtitle>{"\n\n"}
                    <Text>
                        Todo o conteúdo do aplicativo, incluindo as músicas, são protegidos por leis de direitos autorais.
                        Você não pode usar o conteúdo do aplicativo sem a permissão dos proprietários dos direitos autorais.
                    </Text>{"\n\n"}
                    <Subtitle>3. Coleta de dados</Subtitle>{"\n\n"}
                    <Text>
                        O aplicativo utiliza os serviços de terceiros como o {goTo(link, 'Google Analytics')} para coletar dados sobre o uso do aplicativo,
                        como: número de usuários, as músicas mais populares e as falhas do aplicativo.{'\n'}
                        Nenhuma informação pessoal é coletada pelo {goTo(link, 'Google Analytics.')}
                    </Text>{"\n\n"}
                    <Subtitle>4. Modificações</Subtitle>{"\n\n"}
                    <Text>
                        Podemos modificar o aplicativo ou estes termos de uso a qualquer momento sem aviso prévio.
                        Se você continuar a usar o aplicativo após as modificações, isso significa que você concorda com os novos termos de uso.
                    </Text>{"\n\n"}
                    <Subtitle>5. Limitação de responsabilidade</Subtitle>{"\n\n"}
                    <Text>
                        Não somos responsáveis por qualquer perda ou dano resultante do uso ou incapacidade de usar o aplicativo,
                        incluindo danos indiretos, incidentais, consequentes, especiais ou punitivos.
                    </Text>{"\n\n"}
                    <Subtitle>6. Lei aplicável </Subtitle>{"\n\n"}
                    <Text>
                        Estes termos de uso são regidos pelas leis do país em que a empresa está sediada.
                    </Text>{"\n\n"}
                    <Subtitle>7. Contato</Subtitle>{"\n\n"}
                    <Text>
                        Se você tiver alguma dúvida sobre estes Termos de Uso,
                        entre em contato conosco pelo e-mail: {goTo(sendEmail, 'anthony.silvaoliveira@outlook.com')}
                    </Text>
                </Wrapper>
            </ScrollView>
        </Container>
    );
}