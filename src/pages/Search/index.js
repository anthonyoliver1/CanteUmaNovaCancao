import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Dimensions, Keyboard, TouchableWithoutFeedback, Text, Pressable } from "react-native";
import { Container, ListView, SearchButton, SearchInput, styles } from "../../style/SearchStyle";
import { Author, ButtonTitle, Kids, Title } from "../../../style";
import { InfoMusic, List } from "../../style/LyricsStyle";
import mockMusicData from '../../utils/mockMusicData.json';
import themes from "../../style/themes";
import { useToast } from "react-native-toast-notifications";
import MusicContext from "../../contexts/music";
import { formatNameMusic } from "../../utils";
import RecentSearches from "../../components/RecentSearches";
import SearchesContext from "../../contexts/search";

export default function Search({ navigation }) {
    const { show } = useToast();

    const {
        allMusics
    } = useContext(MusicContext);

    const {
        recentSearches,
        setRecentSearchesInMemory,
        getRecentSearchesInMemory,
    } = useContext(SearchesContext)

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/cunc.png')
    }

    const widthScreen = Dimensions.get('window').width - 15;

    const [textSearch, setTextSearch] = useState('');
    const [textValue, setTextValue] = useState('');
    const [dataMusic, setDataMusic] = useState([]);
    const [dataMusicTemp, setDataMusicTemp] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        getRecentSearchesInMemory();
    }, []);

    const searchMusic = () => {
        const message = 'Digite o nome da música para buscar';
        const notFoundMessage = 'Música não encontrada';

        setDataMusic(dataMusicTemp);
        setIsFocus(false);

        if (textSearch.length <= 1) {
            setDataMusic([]);
            return show(message, { type: 'warning' });
        }

        if (dataMusicTemp.length <= 0) {
            return show(notFoundMessage, { type: 'warning' });
        }

        setSearchesInMemory();
        Keyboard.dismiss();
    }

    const searcMusicTemp = (value) => {
        const textSearch = normalize(value);

        if (!value.length) return setDataMusic([]);
        const mockMusic = JSON.parse(JSON.stringify(allMusics));
        const filterTitle = mockMusic.filter(i => normalize(i.title).includes(textSearch));
        const filterMusicLetter = mockMusic.filter(i => normalize(i.music.text).includes(textSearch));
        const filterMusicNumber = mockMusic.filter(i => i.number.toString() == textSearch);
        const filteredByText = filterTitle.length ? filterTitle : filterMusicLetter;
        const filter = filteredByText.concat(filterMusicNumber);

        setTextSearch(textSearch);
        setDataMusicTemp(filter);
        return filter;
    }

    const normalize = (value) => {
        return value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9]+/g, "")
            .replace(/\s/g, '')
    }

    const setSearchesInMemory = (param = null) => {
        const textInSearch = param !== null ? String(param).trim() : String(textValue).trim();
        const date = new Date().getTime();

        if (!recentSearches.length && textInSearch.length) {
            const list = [
                { id: 1, search: textInSearch, lastUpdate: date }
            ];

            setRecentSearchesInMemory(list);
            return;
        }

        const getEqualsValues = recentSearches.find(({ search }) =>
            String(search).toUpperCase() === String(textInSearch).toUpperCase()
        );

        const getIndex = recentSearches.findIndex(({ search }) =>
            String(search).toUpperCase() === String(textInSearch).toUpperCase()
        );

        if (recentSearches.length && !getEqualsValues && textInSearch.length) {
            const getAllIds = recentSearches[recentSearches.length - 1].id;

            recentSearches.push({ id: getAllIds + 1, search: textInSearch, lastUpdate: date });
            const dataNew = [...new Map(recentSearches.map(item => [item.search, item])).values()];

            setRecentSearchesInMemory(dataNew);
        }

        if (recentSearches.length && getEqualsValues) {
            recentSearches[getIndex].lastUpdate = date;
            setRecentSearchesInMemory(recentSearches);
        }

    }

    const gotToMusicText = ({ number, title, music, author }) => {
        const { text, audio } = music;
        navigation.navigate(
            'Search',
            {
                screen: 'MusicLetterSearch',
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

    const renderItem = ({ item, separators }) => (
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
                        <Title>{formatNameMusic(item)}</Title>
                        <Author>{item.author}</Author>
                    </View>
                    <View>
                        {item.kids && <Kids>Kids</Kids>}
                        {item.natal && <Kids>Natal</Kids>}
                    </View>
                </InfoMusic>
            </List>
        </TouchableOpacity>
    )

    function closeRecentsAndSearch(params) {
        const musicSearched = searcMusicTemp(params);
        setTextValue(params);
        setIsFocus(false);
        setDataMusic(musicSearched);
        setSearchesInMemory(params);
    }

    function cancelSelection() {
        Keyboard.dismiss();
        setTextValue('');
        setIsFocus(false);
        setDataMusic([]);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <View style={[styles.wrapper]}>
                    <SearchInput
                        placeholder={"Pesquisar música ..."}
                        placeholderTextColor={'#c0c0c0'}
                        onChangeText={(text) => {
                            searcMusicTemp(text)
                            setTextValue(text)
                        }}
                        onSubmitEditing={searchMusic}
                        selectionColor={themes.dark.colors.primary}
                        onFocus={() => getRecentSearchesInMemory()}
                        onPressIn={() => {
                            setIsFocus(true)
                        }}
                        changeWidth={isFocus}
                        style={{ color: '#FFFF' }}
                        value={textValue}
                    />
                    {isFocus &&
                        <Pressable style={{ width: 65 }} onPress={cancelSelection}>
                            <Text style={[styles.textCancel]} >Cancelar</Text>
                        </Pressable>
                    }
                </View>
                <SearchButton
                    style={
                        ({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? '#24b1ec'
                                    : '#0B97D3'
                            },
                        ]
                    }
                    onPress={() => searchMusic()}
                >
                    <ButtonTitle>Pesquisar</ButtonTitle>
                </SearchButton>
                {!isFocus ?
                    <ListView>
                        <FlatList
                            data={dataMusic}
                            renderItem={renderItem}
                            keyExtractor={item => item.number}
                        />
                    </ListView>
                    : <View
                        style={[styles.containerRecentSeaches]}
                    >
                        {recentSearches.length ?
                            <RecentSearches searchForRecent={closeRecentsAndSearch} />
                            : null
                        }
                    </View>
                }
            </Container>
        </TouchableWithoutFeedback>
    )
};