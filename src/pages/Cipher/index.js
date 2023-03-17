import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { Container, InfoMusic, List, Wrapper } from '../../style/LyricsStyle';
import { Author, Title } from '../../../style';
// import mockMusicData from '../../utils/mockMusicData.json';
import MusicContext from '../../contexts/music';
import LoadingIndicator from '../../components/Loading';

export default function Cipher({ navigation }) {
    const {
        allCiphers,
        refreshing,
        getStorageCipher,
    } = useContext(MusicContext);

    const [refreshingManually, setRefreshingManually] = useState(false);


    useEffect(() => {
        getStorageCipher();
    }, []);

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
        );
    }

    const widthScreen = Dimensions.get('window').width - 10;

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/cunc.png')
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

    const onRefresh = useCallback(async () => {
        setRefreshingManually(true);
        getStorageCipher();
    }, [refreshing]);

    return (
        <Container>
            {allCiphers.length ?
                <VirtualizedList
                    data={allCiphers}
                    initialNumToRender={50}
                    renderItem={renderItem}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    keyExtractor={item => item.number}
                    onRefresh={onRefresh}
                    refreshing={refreshing && !!refreshingManually}
                />
                :
                <LoadingIndicator />
            }
        </Container>
    );
};
