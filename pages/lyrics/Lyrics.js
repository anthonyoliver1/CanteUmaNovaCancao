import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import mockMusicData from '../../utils/mockMusicData.json';
import { Author, Kids, Title } from '../../style';
import { Container, List } from '../../style/LyricsStyle';

export default function Lyrics({ navigation }) {

    const gotToMusicText = ({ number, title, music, author }) => {
        const { text, audio } = music;
        navigation.navigate(
            'Home',
            {
                screen: 'MusicLetter',
                params: {
                    numMusic: number,
                    musicTxt: text,
                    musicTitle: title,
                    audio: audio,
                    author: author
                }
            }
        )
    }

    return (
        <Container>
            <FlatList
                data={mockMusicData}
                renderItem={({ item, index, separators }) => (
                    <TouchableOpacity
                        key={item.number}
                        onPress={() => gotToMusicText(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        activeOpacity={0.4}
                    >
                        <List>
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
                        </List>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.number}
            />
        </Container>
    );
};
