import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Container } from '../../style/MusicStyle';
import { Wrapper } from '../../../style';
import { Cipher, Lyrics } from '../../style/CipherStyle';

export default function MusicCipher({ route }) {
    const { cipher } = route.params;

    const [onlyCipher, setOnlyCipher] = useState('');
    const [lyrics, setLyrics] = useState('');

    useEffect(() => {
        const cipherComplete = cipher.split('\n');
        let ciphers = '';
        let lyrics = '';

        cipherComplete.map(item => {
            if (item.startsWith('&')) {
                ciphers += item.substring(1) + '\n';
                lyrics += '\n';
            } else {
                lyrics += item + '\n';
                ciphers += '\n';
            }
        });

        setOnlyCipher(ciphers);
        setLyrics(lyrics);
    }, []);

    return (
        <Wrapper>
            <ScrollView>
                <Container>
                    <Lyrics>{lyrics}</Lyrics>
                    <Cipher>{onlyCipher}</Cipher>
                </Container>
            </ScrollView>
        </Wrapper>
    );
}
