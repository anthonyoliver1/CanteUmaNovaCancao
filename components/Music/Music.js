import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function Music({ route }) {
    const { colors } = useTheme();
    const { musicTxt } = route.params;

    return (
        <ScrollView>
            <View style={[style.container, style.view]}>
                <Text style={[style.music, { color: colors.text }]}>
                    {musicTxt}
                </Text>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    music: {
        textAlign: 'center',
        lineHeight: 25,
        fontSize: 16
    },
    view: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        minWidth: '100%'
    },
})