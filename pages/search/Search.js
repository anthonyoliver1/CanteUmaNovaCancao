import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, TextInput, ToastAndroid, FlatList, TouchableOpacity } from "react-native";
import { typeDevice } from "../../utils/Index";
import { useTheme } from '@react-navigation/native';
import mockMusicData from '../../utils/mockMusicData.json';
import { useToast } from "react-native-toast-notifications";


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

    return (
        <View style={[styles.centeredView, [{ color: colors.text }]]}>
            <TextInput
                style={[styles.input, [{ color: colors.text }]]}
                placeholder={"Pesquisar música ..."}
                placeholderTextColor={dark ? '#5a5a5a' : '#c0c0c0'}
                onChangeText={text => searcMusicTemp(text)}
            />
            <Pressable
                style={
                    ({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#24b1ec'
                                : '#5bc8f5'
                        },
                        styles.button
                    ]
                }
                onPress={() => searchMusic()}
            >
                <Text style={[styles.textStyle]}>Pesquisar</Text>
            </Pressable>

            <View style={[styles.containerList]}>
                <FlatList
                    data={dataMusic}
                    renderItem={({ item, index,  separators }) => (
                        <TouchableOpacity
                            key={item.number}
                            onPress={() => gotToMusicText(item)}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}
                            activeOpacity={0.4}
                        >
                            <View style={[styles.item,{backgroundColor: index % 2 === 0 ? '#c1c1c13b' : ''}]}>
                                <View>
                                    <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                                    <Text style={[styles.author]}>{item.author}</Text>
                                </View>
                                <>
                                    {item.kids ?
                                        <Text style={{ color: '#5bc8f5', fontSize: 16 }}>kids</Text>
                                        : null
                                    }
                                </>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.number}
                /> 
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        alignItems: "center",
        paddingTop: 20,
        width: '100%',
        height: '100%'
    },
    containerList: {
        flex:1,
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 160,
        marginBottom: 10,
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#5bc8f5",
        height: 40,
        padding: 10,
        marginBottom: 10,
        width: 300,
    },
    item: {
        padding: 15,
        marginVertical: 3,
        marginHorizontal: 16,
        borderBottomColor: '#5bc8f5',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
    },
    author: {
        color: 'gray'
    },
});
