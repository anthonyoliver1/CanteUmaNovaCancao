import React from "react";
import { ScrollView, Text } from "react-native";
import { AppName, Container, Subtitle, Title, Wrapper } from "../../style/TermsAndPrivacyStyle";

export default function TermsOfUse() {
    return (
        <Container>
            <ScrollView>
                <Wrapper>
                    <Title>Termos de Uso</Title>{"\n\n"}
                    <Text>
                        Seja bem-vindo ao <AppName>Cante Uma Nova Canção</AppName>!{"\n"}
                        Estes termos e condições descrevem as regras de uso do aplicativo Cante Uma Nova Canção,
                        que esta publicado nas lojas de aplicativos Google Play Store e Apple App Store.
                    </Text>{"\n\n"}
                    <Text>
                        Ao acessar o aplicativo, consideramos que você está de acordo com os termos e condições abaixo.
                        Não continue a usar o Cante Uma Nova Canção caso você discorde dos termos e condições descritos neste contrato.
                    </Text>{"\n\n"}
                    <Subtitle>Cookies</Subtitle>{"\n\n"}
                    <Text>
                        O aplicativo usa cookies para ajudar na personalização da sua experiência.
                        Ao usar o <AppName>Cante Uma Nova Canção</AppName>, você concorda com o uso dos cookies requeridos.
                    </Text>{"\n\n"}
                    <Text>
                        Nós podemos usar cookies para coletar, armazenar ou rastrear informações para finalidades estatísticas e mercadológicas do app.
                        Você tem a opção de aceitar ou rejeitar os cookies opcionais.
                        Existem alguns cookies obrigatórios, que são necessários para o funcionamento de nosso site.
                        Esses cookies obrigatórios são requerem seu consentimento.
                        Por favor, tenha em mente que, ao aceitar os cookies obrigatórios, você também estará aceitando cookies de terceiros,
                        que podem ser usados por terceiros caso você utilize serviços fornecidos por eles em nosso site – por exemplo,
                        uma janela de reprodução de vídeo fornecida por empresas terceiras e integrada ao nosso site.
                    </Text>{"\n\n"}
                    <Subtitle>Licença</Subtitle>{"\n\n"}
                    <Text>
                        Exceto em casos em que for indicado o contrário, a Igreja De Cristo Internacional
                        e seus licenciados têm direito à propriedade intelectual de todo o material postado no <AppName>Cante Uma Nova Canção</AppName>.
                        Todos os direitos à propriedade intelectual são reservados.
                    </Text>{"\n\n"}
                    <Subtitle>Declaração de Isenção de Responsabilidade</Subtitle>{"\n\n"}
                    <Text>
                        No máximo possível permitido por lei, nós excluímos todas as representações,
                        garantias e condições relativas ao nosso app e ao uso deste site.
                    </Text>{"\n\n"}
                    <Text>
                        Enquanto o site e as informações e serviços do site forem oferecidos gratuitamente,
                        nós não seremos responsáveis por perdas e danos de qualquer natureza.
                    </Text>
                </Wrapper>
            </ScrollView>
        </Container>
    );
}