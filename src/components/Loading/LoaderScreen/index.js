import React from "react";
import { Container } from "../../../style/LoaderScreenStyle";
import { MotiImage } from 'moti';

export default function Loader() {
    return (
        <Container>
            <MotiImage
                from={{
                    translateY: 0,
                }}
                animate={{
                    translateY: -30,
                    opacity: 1
                }}
                transition={{
                    type: 'timing',
                    duration: 1000,
                    repeat: 4,
                }}
                style={{ width: '50%', height: '100%' }}
                source={require('../../../assets/splash_logo.png')}
            />
        </Container>
    )
}