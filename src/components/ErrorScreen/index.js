import React from "react";
import { Image, NativeModules } from "react-native";
import { ButtonTitle } from "../../../style";
import { Container, ErrorButton, MessageErrorSubTitle, MessageErrorTitle, Wrapper } from "../../style/ErrorScreenStyle";

export default function ErrorScreen() {

    const reloadApp = () => {
        NativeModules.DevSettings.reload();
    }

    return (
        <Container>
            <Wrapper>
                <Image
                    style={{ width: 300, height: 300 }}
                    source={require('../../assets/no-connection.gif')}
                />
                <MessageErrorTitle>
                    Falha ao carregar
                </MessageErrorTitle>
                <MessageErrorSubTitle>
                    Tente novamente!
                </MessageErrorSubTitle>
            </Wrapper>

            <ErrorButton style={
                ({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? '#24b1ec'
                            : '#0B97D3'
                    }
                ]
            }
                onPress={reloadApp}
            >
                <ButtonTitle>Reiniciar app</ButtonTitle>
            </ErrorButton>
        </Container>
    )
}