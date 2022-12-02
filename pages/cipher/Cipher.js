import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { Author, Title } from '../../style';
import { Container, InfoMusic, List, Wrapper } from '../../style/LyricsStyle';
import mockMusicData from '../../utils/mockMusicData.json';

export default function Cipher({ navigation }) {
    const [onlyCipher, setOnlyCipher] = useState({});

    useEffect(() => {
        setOnlyCipher(mockMusicData.filter(cipher => cipher.music.cifra));
    }, [])

    const gotToMusicCipher = ({ number, title, music, author }) => {
        const { text, audio, cifra } = music;
        navigation.navigate(
            'Cipher',
            {
                screen: 'MusicCipher',
                params: {
                    numMusic: number,
                    musicTxt: text,
                    musicTitle: title,
                    audio: audio,
                    author: author,
                    cipher: cifra
                }
            }
        )
    }

    const widthScreen = Dimensions.get('window').width - 10;

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/note_logo.png')
    }

    const renderItem = ({ item, separators }) => (
        <TouchableOpacity
            key={item.number}
            onPress={() => gotToMusicCipher(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
            activeOpacity={0.4}
        >
            <Wrapper>
                <List>
                    <Image
                        source={data[item.album]}
                        style={{ width: 45, height: 45, borderRadius: 8, marginRight: 10 }}
                    />
                    <InfoMusic width={widthScreen}>
                        <View>
                            <Title>{item.title}</Title>
                            <Author>{item.author}</Author>
                        </View>
                        <View>
                            {item.kids && <Kids>kids</Kids>}
                        </View>
                    </InfoMusic>
                </List>
            </Wrapper>
        </TouchableOpacity>
    )

    const getItemCount = data => data.length;

    const getItem = (data, index) => {
        return data[index];
    }

    return (
        <Container>
            <VirtualizedList
                data={onlyCipher}
                initialNumToRender={50}
                renderItem={renderItem}
                getItemCount={getItemCount}
                getItem={getItem}
                keyExtractor={item => item.number}
            />
        </Container>
    );
};
