import React, { useState } from "react";
import { Alert, View, ToastAndroid, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { typeDevice } from "../../utils/Index";
import { useTheme } from '@react-navigation/native';
import mockMusicData from '../../utils/mockMusicData.json';
import { useToast } from "react-native-toast-notifications";
import { Container, ListView, SearchButton, SearchInput } from "../../style/SearchStyle";
import { Author, ButtonTitle, Kids, Title } from "../../style";
import { InfoMusic, List } from "../../style/LyricsStyle";
import themes from "../../style/themes";


export default function Search({ navigation }) {
    const toast = useToast();
    const [textSearch, setTextSearch] = useState('');
    const { colors, dark } = useTheme();
    const [dataMusic, setDataMusic] = useState([]);
    const [dataMusicTemp, setDataMusicTemp] = useState([]);

    const searchMusic = () => {
        const message = 'Digite o nome da música para buscar';
        const notFoundMessage = 'Música não encontrada';
        setDataMusic(dataMusicTemp);

        if (textSearch.length <= 1) {
            setDataMusic([]);
            if (typeDevice.Android())
                return ToastAndroid.show(message, ToastAndroid.SHORT);

            if (typeDevice.iOS())
                return Alert.alert('Hm...', message,
                    [
                        {
                            text: 'Fechar'
                        }
                    ]
                );

            return toast.show(message,
                {
                    type: "danger",
                    placement: "top",
                    duration: 3000,
                    offset: 30,
                    animationType: "zoom-in"
                }
            )

        }

        if (dataMusicTemp.length <= 0) {
            if (typeDevice.Android())
                return ToastAndroid.show(notFoundMessage, ToastAndroid.SHORT);

            if (typeDevice.iOS())
                return Alert.alert('Hm...', notFoundMessage,
                    [
                        {
                            text: 'Fechar'
                        }
                    ]
                );

            return toast.show(notFoundMessage,
                {
                    type: "warning",
                    placement: "top",
                    duration: 3000,
                    offset: 30,
                    animationType: "zoom-in"
                }
            )
        }

    }

    const searcMusicTemp = (value) => {
        const textSearch = value.trim().toLocaleLowerCase();
        const mockMusic = JSON.parse(JSON.stringify(mockMusicData));
        setTextSearch(textSearch);

        return setDataMusicTemp(mockMusic.filter(i => i.title.toLocaleLowerCase().includes(textSearch)));
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

    const widthScreen = Dimensions.get('window').width - 15;

    return (
        <Container>
            <SearchInput
                placeholder={"Pesquisar música ..."}
                placeholderTextColor={'#c0c0c0'}
                onChangeText={text => searcMusicTemp(text)}
                onSubmitEditing={searchMusic}
                selectionColor={themes.dark.colors.primary}
            />
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

            <ListView>
                <FlatList
                    data={dataMusic}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity
                            key={item.number}
                            onPress={() => gotToMusicText(item)}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}
                            activeOpacity={0.4}
                        >
                            <List width={widthScreen}>
                                <Image
                                    source={require('../../assets/note_logo.png')}
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
            </ListView>
        </Container>
    )
};
