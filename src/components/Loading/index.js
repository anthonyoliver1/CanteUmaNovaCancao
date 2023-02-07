import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../../style/LoadingIndicatorStyle";
import themes from "../../style/themes";

export default function LoadingIndicator() {
    return (
        <Container>
            <ActivityIndicator size={'large'} color={themes.dark.colors.primary}/>
        </Container>
    )
}