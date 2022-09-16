import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
    Container,
    MusicLetter,
} from '../../style/MusicStyle';
import { Wrapper } from '../../style';

export default function MusicCipher({ route }) {
    const { cipher } = route.params;

    return (
        <Wrapper>
            <ScrollView>
                <Container>
                    <MusicLetter>
                        {cipher.replace(/&/gm, '')}
                    </MusicLetter>
                </Container>
            </ScrollView>
        </Wrapper>
    );
}
/*
    Apple Watch Series 8 -> Ciclo mestrual e ovulação.
    Apple Watch SE -> chip mais rápido.
    Apple Watch Ultra -> Focado para esportistas.

    AirPods Pro -> novo chip e mesmo design.

    iPhone 14 e iPhone 14 Plus -> 
    
*/ 