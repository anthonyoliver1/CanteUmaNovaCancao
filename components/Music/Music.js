import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import Slider from '@react-native-community/slider';
import { useColorScheme } from 'react-native-appearance';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {
    AuthorMusic,
    Container,
    ContentHeader,
    MusicControl,
    MusicLetter,
    MusicName,
    ProgressConstainer,
    ProgressNummber,
    Time
} from '../../style/MusicStyle';
import { Wrapper } from '../../style';

export default function Music({ route, navigation }) {
    const { musicTxt, audio, author, musicTitle } = route.params;
    const scheme = useColorScheme();

    const modalizeRef = useRef(null);
    const [showButtonPlay, setShowButtonPlay] = useState(undefined)
    const [theme, setTheme] = useState('')
    const [colorButton, setColorButton] = useState('')
    const [marginText, setMarginText] = useState('60px')
    const [typeIcon, setTypeIcon] = useState('play-arrow')
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(100)
    const [musicStarted, setMusicStarted] = useState(false)
    const [sound, setSound] = useState();

    async function playOrPauseSound(params) {
        if (musicStarted) {
            params.includes('play') ? sound.playAsync() : sound.pauseAsync();
            return;
        }

        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/music/O Sonho.mp3')
            );
            setSound(sound);

            await sound.playAsync();

            setMusicStarted(true);
        } catch (error) {
            console.log('Deu erro: ', error)
        }
        return;
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // const checkFile = async () => {
    //     if (typeDevice.mobile()) {
    //         const file = FileSystem.documentDirectory + 'O Sonho.mp3'
    //         const audio = await FileSystem.getInfoAsync(file)
    //         console.log(audio)
    //     }
    // }

    // useEffect(() => {
    //     checkFile()
    // })

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
        <Wrapper>
            <ScrollView>
                <Container>
                    <MusicLetter margin={marginText}>
                        {musicTxt}
                    </MusicLetter>
                </Container>
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
                modalStyle={{ backgroundColor: '#1A1A1A', padding: 30 }}
                handleStyle={{ backgroundColor: "gray" }}
                handlePosition='inside'
                withOverlay={false}
                disableScrollIfPossible={true}
                velocity={2000}
                onOpened={() => setMarginText('270px')}
                onClosed={() => setMarginText('60px')}
            >
                <ContentHeader>
                    <MusicName>
                        {musicTitle}
                    </MusicName>
                    <AuthorMusic>
                        {author}
                    </AuthorMusic>
                </ContentHeader>

                <ProgressConstainer>
                    <View>
                        <Slider
                            value={0} //se moviementa pegando a posicao do audio incial
                            minimumValue={0}
                            maximumValue={1} //pegar o valor maximo dso audio
                            maximumTrackTintColor='gray'
                            minimumTrackTintColor='#0B97D3'
                            thumbTintColor='#0B97D3'
                            onValueChange={value => timeMusic(parseInt(value * 100))}
                            animateTransitions={true}
                        // onSlidingStart={() => setMinValue(0)}
                        // onSlidingComplete={() => setMinValue()}
                        />
                    </View>

                    <ProgressNummber>
                        <Time> {minValue} </Time>
                        <Time> {maxValue} </Time>
                    </ProgressNummber>

                    <MusicControl>
                        <TouchableOpacity onPress={backwardButton}>
                            <MaterialIcons name="replay-30" size={35} color={colorButton} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playOrPause} style={style.playAndPause}>
                            <MaterialIcons name={typeIcon} size={40} color='#fff' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={forwardButton}>
                            <MaterialIcons name="forward-30" size={35} color={colorButton} />
                        </TouchableOpacity>
                    </MusicControl>
                </ProgressConstainer>
            </Modalize>
        </Wrapper>
    );
}

const style = StyleSheet.create({
    floatButtom: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#0B97D3c3',
        display: 'flex',
        flexDirection: 'row'
    },
    playAndPause: {
        backgroundColor: '#0B97D3',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
});