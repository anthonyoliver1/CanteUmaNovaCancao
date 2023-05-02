import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { B } from "../../../style";
import { AppName, Container, Subtitle, Title, Wrapper } from "../../style/TermsAndPrivacyStyle";
import { useToast } from "react-native-toast-notifications";
import qs from 'qs';

export default function PrivacyPolicy() {
    const { show } = useToast();

    async function sendEmail() {
        try {
            const to = 'anthony.silvaoliveira@outlook.com';
            const body = 'Olá, \n\n Estou com dúvidas sobre as Políticas de Privacidade do Cante Uma Nova Canção,\n pode me ajudar ? \n\n Obrigado(a).';
            
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
                    <Title>Políticas Privacidade</Title>{"\n\n"}
                    <Text>
                        Esta Política de Privacidade descreve como o aplicativo <AppName>"Cante Uma Nova Canção"</AppName> coleta,
                        usa e protege as informações pessoais dos usuários do aplicativo.A sua privacidade é muito importante para nós.
                    </Text>{"\n\n"}
                    <Subtitle>1. Informações que coletamos</Subtitle> {"\n\n"}
                    <Text>
                        O aplicativo <AppName>"Cante Uma Nova Canção"</AppName> não coleta nenhuma informação pessoal dos usuários,
                        exceto informações coletadas pelo {goTo(link, 'Google Analytics')}
                    </Text>{"\n\n"}
                    <Subtitle>2. Como usamos as informações</Subtitle>{"\n\n"}
                    <Text>
                        Usamos as informações coletadas pelo {goTo(link, 'Google Analytics')} para:{"\n"}
                        - Análise de dados: como entender as tendências do usuário e melhorar o desempenho do aplicativo.
                    </Text>{"\n\n"}
                    <Subtitle>3. Compartilhamento de informações</Subtitle>{"\n\n"}
                    <Text>
                        Não compartilhamos informações pessoais com terceiros, exceto com o {goTo(link, 'Google Analytics.')}
                    </Text>{"\n\n"}
                    <Subtitle>4. Segurança de informações</Subtitle>{"\n\n"}
                    <Text>
                        Temos medidas de segurança adequadas em vigor para proteger suas informações pessoais contra acesso não autorizado, uso, alteração ou divulgação.
                        No entanto, nenhuma medida de segurança é infalível e não podemos garantir que suas informações pessoais estejam completamente seguras,
                        mas reiteramos que não coletamos informações pessoais dos usuários.
                    </Text>{"\n\n"}
                    <Subtitle>5. Alterações na política de privacidade</Subtitle>{"\n\n"}
                    <Text>
                        Podemos atualizar esta Política de Privacidade a qualquer momento.
                        A nova versão da política de privacidade entrará em vigor quando for publicada no aplicativo.
                        Se você continuar a usar o aplicativo após modificações, significa que você concorda com os novos termos.
                    </Text>{"\n\n"}
                    <Subtitle>6. Contato</Subtitle>{"\n\n"}
                    <Text>
                        Se você tiver alguma dúvida sobre esta Política de Privacidade,
                        entre em contato conosco pelo e-mail: {goTo(sendEmail, 'anthony.silvaoliveira@outlook.com')}
                    </Text>
                    {"\n\n"}
                    <Text>
                        Esta política é efetiva a partir de <B>Mar</B>/<B>2023</B>.
                    </Text>
                </Wrapper>
            </ScrollView>
        </Container>
    );
}