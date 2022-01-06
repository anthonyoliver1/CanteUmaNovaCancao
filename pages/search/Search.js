import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, TextInput, ToastAndroid } from "react-native";
import { typeDevice } from "../../utils/Index";


export default function Search(props) {
    const [text, setText] = useState('');

    const searchMusic = () => {
        let message = 'Digite o nome da música para buscar'
        if (text.length < 1)
            if (typeDevice.Android())
                return ToastAndroid.show(message, ToastAndroid.SHORT);
        if (typeDevice.iOS())
            return Alert.alert('Hm...',message, [{
                text: 'Fechar'
            }
            ])
    }

    return (
        <View style={styles.centeredView}>
            <TextInput
                style={styles.input}
                placeholder={"Digite para buscar uma música"}
                onChangeText={text => setText(text)}
            />
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => searchMusic()}
            >
                <Text style={styles.textStyle}>Buscar Música</Text>
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
        width: 150,
        marginBottom: 10,
        marginTop: 10
    },
    buttonOpen: {
        backgroundColor: "tomato",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "tomato",
        height: 40,
        padding: 5,
        marginBottom: 10,
        width: 300
    },
});
