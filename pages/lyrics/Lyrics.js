import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View, VirtualizedList } from 'react-native';
import mockMusicData from '../../utils/mockMusicData.json';
import { Author, Kids, Title } from '../../style';
import { Container, InfoMusic, List, Wrapper } from '../../style/LyricsStyle';
import Filter from '../../components/Music/Filter';

export default function Lyrics({ navigation }) {
    const widthScreen = Dimensions.get('window').width - 10;

    const [newOrder, setNewOrder] = useState('all');
    const [music, setMusic] = useState(mockMusicData);

    useEffect(() => {
        orderList(newOrder);
    }, [newOrder])

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

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/note_logo.png')
    }

    const changeOrder = (order) => {
        setNewOrder(order);
    }

    const filterOrder = [
        { title: 'Todos', type: 'all' },
        { title: 'Igreja de Cristo Internacional', type: 'ICI' },
        { title: 'Coração Audaz', type: 'audaz' },
        { title: 'Kids', type: 'kids' },
        { title: 'Natal', type: 'natal' },
    ]

    const orderList = (params) => {
        const action = {
            'all': () => {
                setMusic(
                    mockMusicData.filter(i => i.number)
                        .sort((a, b) =>a.title.localeCompare(b.title))
                );
            },
            'audaz': () => {
                setMusic(
                    mockMusicData
                        .filter(i => i.author.includes('Audaz'))
                        .sort((a, b) => a.album.localeCompare(b.album))
                );
            },
            'ICI': () => {
                setMusic(
                    mockMusicData
                        .filter(i => i.author.includes('Igreja'))
                        .sort((a, b) => a.title.localeCompare(b.title))
                );
            },
            'kids': () => {
                setMusic(
                    mockMusicData
                        .filter(i => i.kids)
                        .sort((a, b) => a.title.localeCompare(b.title))
                );
            },
            'natal': () => {
                setMusic(
                    mockMusicData
                        .filter(i => i.natal)
                        .sort((a, b) => a.title.localeCompare(b.title))

                )
            }
        }

        action[params]();
    }

    const keyExtractor = (item) => item.number;

    const renderItem = ({ item, separators }) => (
        <TouchableOpacity
            key={item.number}
            onPress={() => gotToMusicText(item)}
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
                            {item.kids && <Kids>Kids</Kids>}
                            {item.natal && <Kids>Natal</Kids>}
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

    const filter = useCallback(() => (
        <Filter orderList={(params) => changeOrder(params.type)} filterOrder={filterOrder} />
    ), [])

    return (
        <Container>
            <VirtualizedList
                ListHeaderComponent={filter}
                data={music}
                initialNumToRender={50}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </Container>
    );
};
