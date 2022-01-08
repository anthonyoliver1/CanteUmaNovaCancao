import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function Cipher() {
    const { colors } = useTheme();

    return(
        <View>
            <Text style={{color: colors.text}}>As Cifras apareceram aqui!</Text>
        </View>
    ) 
};
