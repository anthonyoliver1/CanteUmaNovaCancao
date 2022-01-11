import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Lyrics() {
    const { colors } = useTheme();

    return (
        <View>
            <Text style={{color: colors.text}}>A letra das Músicas apareceram aqui!</Text>
        </View>
    )
};
