import React from "react";
import { Container, ContainerButton, Content, FeaturedName, MinimalText, SpecialButton } from "../../style/SpecialEditionStyle";
import { ScrollView, Text } from "react-native";
import { B, ButtonTitle } from "../../../style";
import { useToast } from "react-native-toast-notifications";
import { wait } from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SpecialPage() {
    const { show } = useToast();

    const ereaseData = async () => {
        let timeOut = 5;
        show('Você apertou o botão né? 😑', { type: 'warning' });

        wait(4000).then(() =>
            show('Agora seu app vai se autodestruir 🤯', { type: 'warning' })
        );

        wait(4500).then(() => {
            const time = setInterval(() => {
                show(`Em ${timeOut--}`, { type: 'danger' });

                if (timeOut <= 0) {
                    wait(2500).then(() =>
                        show('Brincadeira 😛', { type: 'normal' })
                    )
                    wait(5500).then(() => {
                        show('Mas as músicas foram apagadas feche e abra o app que tudo volta ao normal 😅', { type: 'normal', duration: 8000 })
                    })
                    clearInterval(time);
                }
            }, 1000);
        });

        await AsyncStorage.removeItem('@ALL_MUSICS');
    }

    return (
        <Container>
            <ScrollView>
                <Content>
                    <Text>
                        Olá, se você chegou aqui é porque descobriu um botão escodido no app e tocou nele 10x para conseguir chegar aqui 😬.{'\n\n'}

                        Mas aproveitando a sua ilustre presença, quero te contar uma coisa ...{'\n'}
                        Eu me chamo Anthony, faço parte da Igreja de Cristo Internacional de São de Paulo (ICISP),
                        localizada na região leste.{'\n\n'}

                        O app com esta interface que você está usando foi construída por mim, mas para chegar nesse resultado,
                        eu tive ajuda de algumas pessoas, e essa é a curiosidade que quero te contar hihi.
                        {'\n\n'}

                        <B>Pessoas que ajudaram na construção do app:</B>{'\n\n'}

                        {'\u2022'} <FeaturedName>Fabio Ferreira:</FeaturedName> Foi o criador das primeiras versões do C.U.N.C* e graças a ele tive a ideia de criar uma nova interface, que inclusive é essa versão que você esta usando rs.{'\n\n'}
                        {'\u2022'} <FeaturedName>Álex Oliveira:</FeaturedName> Me incentivou, me motivou e viu o app nascer do zero, me ajudou com várias sugestões no desenvolvimento, na esolha do layout e me deu impulso para continuar a sonhar com o app e fazê-lo evoluir.{'\n\n'}
                        {'\u2022'} <FeaturedName>Daniele Melo:</FeaturedName> Uma das pessoas importantes na construção desse app, me ajudou nas correções e revisões de textos, nas escolhas de cores do app, me dando apoio, sugestões, ajudando a deixar o app mais simples e interativo, também foi a Q.A por mais tempo.{'\n\n'}
                        {'\u2022'} <FeaturedName>Marcus Del Pino:</FeaturedName> A pessoas que me ajuda com o design do app principalmente no logo e também no desenvolvimeto da versão Web (isso é um spolier, então guarde em segredo hein 🙃).{'\n\n'}
                    </Text>
                    <MinimalText>* C.U.N.C é a abreviação de Cante Um Nova Canção.</MinimalText>
                </Content>

                <ContainerButton>
                    <SpecialButton style={
                        ({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? '#24b1ec'
                                    : '#0B97D3'
                            }
                        ]
                    }
                        onPress={ereaseData}
                    >
                        <ButtonTitle>Não aperte este botão</ButtonTitle>
                    </SpecialButton>
                </ContainerButton>
            </ScrollView>
        </Container>
    )
}