import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, TextInput, ToastAndroid } from "react-native";
import { typeDevice } from "../../utils/Index";
import { useTheme } from '@react-navigation/native';


export default function Search(props) {
    const [text, setText] = useState('');
    const { colors, dark } = useTheme();


    const searchMusic = () => {
        let message = 'Digite o nome da música para buscar'
        if (text.length < 1)
            if (typeDevice.Android())
                return ToastAndroid.show(message, ToastAndroid.SHORT);
        if (typeDevice.iOS())
            return Alert.alert('Hm...', message, [{
                text: 'Fechar'
            }])
    }

    return (
        <View style={[styles.centeredView,[{color: colors.text}]]}>
            <TextInput
                style={[styles.input,[{color: colors.text}]]}
                placeholder={"Digite para buscar uma música"}
                placeholderTextColor={dark ? '#5a5a5a' : '#c0c0c0'}
                onChangeText={text => setText(text)}
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
                <Text style={[styles.textStyle]}>Buscar Música</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20
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
});
