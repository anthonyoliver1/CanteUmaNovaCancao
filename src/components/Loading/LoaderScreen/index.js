import React from "react";
import { ActivityIndicator, Image } from "react-native";
import { Container, LoadingContainer } from "../../../style/LoaderScreenStyle";
import themes from "../../../style/themes";

export default function Loader() {
    return (
        <Container>
            <Image
                style={{ width: '50%', height: '100%' }}
                source={require('../../../assets/splash_logo.png')}
            />
            <LoadingContainer>
                <ActivityIndicator size={'large'} color={themes.dark.colors.card} />
            </LoadingContainer>
        </Container>
    )
}