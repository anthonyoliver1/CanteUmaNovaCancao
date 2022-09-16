import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { Author, Title } from '../../style';
import { Container, InfoMusic, List } from '../../style/LyricsStyle';
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

    const widthScreen = Dimensions.get('window').width - 15;

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/note_logo.png')
    }

    return (
        <Container>
            <FlatList
                data={onlyCipher}
                renderItem={({ item, separators }) => (
                    <TouchableOpacity
                        key={item.number}
                        onPress={() => gotToMusicCipher(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        activeOpacity={0.4}
                    >
                        <List width={widthScreen}>
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
                                    {item.kids ?
                                        <Kids>kids</Kids>
                                        : null
                                    }
                                </View>
                            </InfoMusic>
                        </List>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.number}
            />
        </Container>
    );
};
