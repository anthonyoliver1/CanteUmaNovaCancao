import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import Slider from '@react-native-community/slider';
import { useColorScheme } from 'react-native-appearance';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import music from '../../assets/music/O Sonho.mp3'
import { typeDevice } from '../../utils/Index';

const myAudio = new Audio.Sound()

export default function Music({ route, navigation }) {
    const { musicTxt, audio, author, musicTitle } = route.params;
    const { colors } = useTheme();
    const scheme = useColorScheme();

    const modalizeRef = useRef(null);
    const [showButtonPlay, setShowButtonPlay] = useState(undefined)
    const [theme, setTheme] = useState('')
    const [colorButton, setColorButton] = useState('')
    const [marginText, setMarginText] = useState(60)
    const [typeIcon, setTypeIcon] = useState('play-arrow')
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(100)
    const [musicStarted, setMusicStarted] = useState(false)
    const [sound, setSound] = useState();

    async function playOrPauseSound(params) {
        if (musicStarted) {
            params.includes('play') ? myAudio.playAsync() : myAudio.pauseAsync()
            return
        }

        try {
            console.log('Loading Sound')
            const sound = await myAudio.loadAsync(require('../../assets/music/O Sonho.mp3')); // usar {uri: audio}
            setSound(sound);

            console.log('Sound', sound)
            await myAudio.playAsync();
            setMusicStarted(true)
        } catch (error) {
            console.log('Deu erro: ', error)
        }
        return
    }

    // Esse useEffect esta fazendo unload do audio carregado
    useEffect(() => {
        return sound
            ? () => {
                myAudio.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const checkFile = async () => {
        if (typeDevice.mobile()) {
            const file = FileSystem.documentDirectory + 'O Sonho.mp3'
            const audio = await FileSystem.getInfoAsync(file)
            console.log(audio)
        }
    }

    useEffect(() => {
        checkFile()
    })

    useEffect(() => {
        scheme === 'dark' ? setTheme('#222') : setTheme('#fff')
        scheme === 'dark' ? setColorButton('#fff') : setColorButton('gray')
    }, [scheme])

    useEffect(() => {
        setShowButtonPlay(Boolean(audio));
    }, [audio])

    const showModalMusicAudio = () => {
        modalizeRef.current?.open();
    }

    const playOrPause = () => {
        if (typeIcon === 'play-arrow') {
            setTypeIcon('pause')
            playOrPauseSound('play')
        }
        else {
            setTypeIcon('play-arrow')
            playOrPauseSound('pause')
        }
    }

    const forwardButton = () => {
        console.log('FRENTE')
    }
    const backwardButton = () => {
        console.log("TRAZ")
    }

    const timeMusic = (value) => {
        let max = 100
        setMinValue(value)
        setMaxValue(value - max)
    }

    return (
        <>
            <ScrollView>
                <View style={[style.container, style.view]}>
                    <Text
                        style={
                            [
                                style.music,
                                {
                                    color: colors.text,
                                    marginBottom: marginText
                                }
                            ]
                        }
                    >
                        {musicTxt}
                    </Text>
                </View>
            </ScrollView>

            {showButtonPlay ?
                <TouchableOpacity style={style.floatButtom} onPress={showModalMusicAudio}>
                    <MaterialIcons name="audiotrack" size={24} color="#fff" />
                </TouchableOpacity>
                : null
            }

            <Modalize ref={modalizeRef}
                // snapPoint={330}
                modalHeight={270}
                modalStyle={{ backgroundColor: theme, padding: 30 }}
                handleStyle={{ backgroundColor: "gray" }}
                handlePosition='inside'
                withOverlay={false}
                disableScrollIfPossible={true}
                velocity={2000}
                onOpened={() => setMarginText(270)}
                onClosed={() => setMarginText(60)}
            >
                <View style={style.musicContainerTitleAndAuthor}>
                    <Text
                        style={[style.musicName, { color: colors.text }]}
                    >
                        {musicTitle}
                    </Text>
                    <Text
                        style={[style.authorMusic, { color: colors.text }]}
                    >
                        {author}
                    </Text>
                </View>

                <View style={style.progressConstainer}>
                    <View>
                        <Slider
                            value={0}
                            minimumValue={0}
                            maximumValue={1}
                            maximumTrackTintColor='gray'
                            minimumTrackTintColor='#5bc8f5'
                            thumbTintColor='#5bc8f5'
                            onValueChange={value => timeMusic(parseInt(value * 100))}
                            animateTransitions={true}
                        // onSlidingStart={() => setMinValue(0)}
                        // onSlidingComplete={() => setMinValue()}
                        />
                    </View>

                    <View style={style.progressNumberContainer}>
                        <Text
                            style={[style.progressTimeMusicText, { color: colors.text }]}
                        >
                            {minValue}
                        </Text>
                        <Text
                            style={[style.progressTimeMusicText, { color: colors.text }]}
                        >
                            {maxValue}
                        </Text>
                    </View>
                    <View style={style.buttonsMusicControl}>
                        <TouchableOpacity onPress={backwardButton}>
                            <MaterialIcons name="replay-30" size={35} color={colorButton} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playOrPause} style={style.playAndPause}>
                            <MaterialIcons name={typeIcon} size={40} color='#fff' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={forwardButton}>
                            <MaterialIcons name="forward-30" size={35} color={colorButton} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </>
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
        minWidth: '100%',
        minHeight: Dimensions.get('window').height
    },
    floatButtom: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#5bc8f5c3',
        display: 'flex',
        flexDirection: 'row'
    },
    playAndPause: {
        backgroundColor: '#5bc8f5',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    musicContainerTitleAndAuthor: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    buttonsMusicControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        top: 10,
        height: 100
    },
    musicName: {
        fontSize: 20,
        fontWeight: '700'
    },
    authorMusic: {
        fontSize: 15,
        fontWeight: '200'
    },
    progressConstainer: {
        width: '100%',
        justifyContent: 'center',
    },
    progressNumberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        bottom: 5,
    },
    progressTimeMusicText: {
        fontSize: 13
    }
});