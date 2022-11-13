import React, { useCallback } from 'react';
import { Dimensions, FlatList, Image, Platform, TouchableOpacity, View } from 'react-native';
import mockMusicData from '../../utils/mockMusicData.json';
import { Author, Kids, Title } from '../../style';
import { Container, InfoMusic, List } from '../../style/LyricsStyle';

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

    const widthScreen = Dimensions.get('window').width - 15;

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/note_logo.png')
    }
    const keyExtractor = (item) => item.number;

    const renderItem = useCallback(({ item, separators }) => (
        <TouchableOpacity
            key={item.number}
            onPress={() => gotToMusicText(item)}
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
    ), [])

    return (
        <Container>
            <FlatList
                data={mockMusicData}
                initialNumToRender={50}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </Container>
    );
};
