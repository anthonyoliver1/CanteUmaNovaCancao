import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import mockMusicData from '../../utils/mockMusicData.json';

export default function Lyrics({ navigation }) {
    const { colors } = useTheme();

    const gotToMusicText = ({ number, title, music }) => {
        const { text } = music;
        navigation.navigate('Home', { screen: 'MusicLetter', params: { numMusic: number, musicTxt: text, musicTitle: title } })
    }

    return (
        <SafeAreaView style={styles.container}>
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
                        <View style={[styles.item]}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
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
