import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Container } from '../../style/MusicStyle';
import { Wrapper } from '../../../style';
import { Cipher } from '../../style/CipherStyle';

export default function MusicCipher({ route }) {
    const { cipher } = route.params;

    return (
        <Wrapper>
            <ScrollView>
                <Container>
                    <Cipher>
                        {cipher.replace(/&/gm, '')}
                    </Cipher>
                </Container>
            </ScrollView>
        </Wrapper>
    );
}
