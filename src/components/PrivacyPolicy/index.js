import React from "react";
import { ScrollView, Text } from "react-native";
import { B } from "../../../style";
import { AppName, Container, Subtitle, Title, Wrapper } from "../../style/TermsAndPrivacyStyle";

export default function PrivacyPolicy() {
    return (
        <Container>
            <ScrollView>
                <Wrapper>
                    <Title>Políticas Privacidade</Title>{"\n\n"}
                    <Text>
                        Nós adotamos esta Política de Privacidade, que determina como nós estamos processando as informações coletadas pelo app
                        <AppName> Cante Uma Nova Canção</AppName> e também explica por quais razões nós precisamos coletar dados pessoais sobre você.
                        Portanto, você deve ler esta Política de Privacidade antes de usar o aplicativo <AppName>Cante Uma Nova Canção</AppName>.
                    </Text>{"\n\n"}
                    <Subtitle>Informações que coletamos</Subtitle> {"\n\n"}
                    <Text>
                        Quando você usa o aplicativo <AppName>Cante Uma Nova Canção</AppName>, nós automaticamente coletamos certas informações sobre seu dispositivo,
                        incluindo informações sobre seu endereço IP, fuso horário e alguns dos cookies instalados no seu dispositivo.
                        Além disso, quando você usa o app, nós coletamos informações sobre as páginas individuais ou músicas que você visualiza/escuta,
                        e sobre como você interage com o app. Nós nos referimos a essas informações coletadas automaticamente como "Informações sobre o dispositivo".
                    </Text>{"\n\n"}
                    <Subtitle>Por que fazemos o coletas dos seus dados?</Subtitle>{"\n\n"}
                    <Text>
                        Para que possamos melhorar o aplicativo com base no uso dos usuários, assim,
                        garantimos uma boa experiência no uso do <AppName>Cante Uma Nova Canção</AppName>.
                    </Text>{"\n\n"}
                    <Subtitle>Links para outros sites</Subtitle>{"\n\n"}
                    <Text>
                        Nosso app pode conter links para outros sites que não são controlados por nós e/ou não são de nossa propriedade.
                        Por favor, esteja ciente de que nós não somos responsáveis pelas políticas de privacidade de tais sites e organizações terceiras.
                        Nós incentivamos você a estar ciente de quando sair do nosso aplicativo,
                        e também incentivamos você a ler a política de privacidade de cada um dos sites/apps que podem coletar suas informações pessoais.
                    </Text>{"\n\n"}
                    <Subtitle>Análise de dados</Subtitle>{"\n\n"}
                    <Text>
                        O Cante Uma Nova Canção usa o o Google Analytics para monitorar e coletar dados enquanto você usa o aplicativo, assim,
                        podemos entregar uma experiência melhor para os usuários do aplicativo.
                    </Text>{"\n\n"}
                    <Subtitle>Declaração legal</Subtitle>{"\n\n"}
                    <Text>
                        Nós vamos divulgar qualquer informação que coletarmos, usarmos ou recebermos caso tal divulgação seja solicitada ou permitida por lei,
                        de forma a cumprir intimações ou processos judiciais similares,
                        e também quando considerarmos em boa fé que a divulgação é necessária para a proteção de nossos direitos,
                        para a proteção da segurança de outros, para investigações de fraude ou para responder a uma solicitação do governo.
                    </Text>{"\n\n"}
                    <Subtitle>Informações de contato</Subtitle>{"\n\n"}
                    <Text>
                        Se você quiser entrar em contato conosco para saber mais sobre esta Política de Privacidade,
                        ou quiser acessar quaisquer informações relativas aos seus direitos individuais e às suas Informações Pessoais,
                        você poderá enviar um e-mail para o endereço anthony.silvaoliveira@outlook.com.
                    </Text>{"\n\n"}
                    <Text>
                        Esta política é efetiva a partir de <B>Mar</B>/<B>2023</B>.
                    </Text>
                </Wrapper>
            </ScrollView>
        </Container>
    );
}