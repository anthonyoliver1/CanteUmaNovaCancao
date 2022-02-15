import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import mockMusicData from '../../utils/mockMusicData.json';

export default function Lyrics({ navigation }) {
    const { colors } = useTheme();

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
        <SafeAreaView style={styles.container} contentContainerStyle={{backgroundColor: 'red'}}>
            <View style={styles.list}>
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
                            <View style={[styles.item, {backgroundColor: index % 2 === 0 ? '#c1c1c13b' : ''}]}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // backgroundColor: 'red'
    },
    list: {
        // backgroundColor: 'yellow',
        width: '100%',
        flex: 1,
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
    }
});
