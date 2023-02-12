import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { Container, InfoMusic, List, Wrapper } from '../../style/LyricsStyle';
import { Author, Kids, Title } from '../../../style';
import Filter from '../../components/Filter';
// import mockMusicData from '../../utils/mockMusicData.json';
import MusicContext from '../../contexts/music';
import LoadingIndicator from '../../components/Loading';

export default function Lyrics({ navigation }) {
    const {
        allMusics,
        refreshing,
        getStorageMusic,
        getMusics,
    } = useContext(MusicContext);

    const widthScreen = Dimensions.get('window').width - 10;

    const [newOrder, setNewOrder] = useState('all');
    const [music, setMusic] = useState({});
    const [refreshingManually, setRefreshingManually] = useState(false);

    useEffect(() => {
        if (allMusics.length) return;

        getStorageMusic();
    }, [allMusics])

    useEffect(() => {
        orderList(newOrder);
    }, [newOrder, allMusics]);

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
        );
    }

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/note_logo.png')
    }

    const changeOrder = (order) => {
        setNewOrder(order.type);
    }

    const filterOrder = [
        { title: 'Todos', type: 'all' },
        { title: 'Igreja de Cristo Internacional', type: 'ICI' },
        { title: 'Coração Audaz', type: 'audaz' },
        { title: 'Kids', type: 'kids' },
        { title: 'Natal', type: 'natal' },
    ]

    const orderList = (params) => {
        if (!allMusics.length) return;

        const action = {
            'all': () => {
                setMusic(
                    allMusics.filter(i => i.number)
                        .sort((a, b) => a.title.localeCompare(b.title))
                );
            },
            'audaz': () => {
                setMusic(
                    allMusics
                        .filter(i => i.author.includes('Audaz'))
                        .sort((a, b) => a.album.localeCompare(b.album))
                );
            },
            'ICI': () => {
                setMusic(
                    allMusics
                        .filter(i => i.author.includes('Igreja'))
                        .sort((a, b) => a.title.localeCompare(b.title))
                );
            },
            'kids': () => {
                setMusic(
                    allMusics
                        .filter(i => i.kids)
                        .sort((a, b) => a.title.localeCompare(b.title))
                );
            },
            'natal': () => {
                setMusic(
                    allMusics
                        .filter(i => i.natal)
                        .sort((a, b) => a.title.localeCompare(b.title))

                );
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
        <Filter listHandler={changeOrder} filterOrder={filterOrder} />
    ), []);

    const onRefresh = useCallback(async () => {
        setRefreshingManually(true);
        getMusics();
        getStorageMusic();
        refreshing && setRefreshingManually(false);
    }, [refreshing]);

    return (
        <Container>
            {allMusics.length ?
                <VirtualizedList
                    ListHeaderComponent={filter}
                    data={music}
                    initialNumToRender={50}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    onRefresh={onRefresh}
                    refreshing={!!refreshing && refreshingManually}
                />
                :
                <LoadingIndicator />
            }
        </Container>
    );
};
