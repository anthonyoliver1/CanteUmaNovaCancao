import React from 'react';
import { ScrollView } from 'react-native';
import { Container, MusicLetter } from '../../style/MusicStyle';
import { Wrapper } from '../../../style';

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
