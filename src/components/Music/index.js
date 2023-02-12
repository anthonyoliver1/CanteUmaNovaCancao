import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Wrapper } from '../../../style';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import themes from '../../style/themes';
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
import { useToast } from 'react-native-toast-notifications';

export default function Music({ route }) {
    const { musicTxt, audio, author, musicTitle } = route.params;
    const { show } = useToast();

    const modalizeRef = useRef(null);
    const [showButtonPlay, setShowButtonPlay] = useState(undefined);
    const [marginText, setMarginText] = useState('60px');
    const [typeIcon, setTypeIcon] = useState('play-arrow');
    const [musicStarted, setMusicStarted] = useState(false);
    const [sound, setSound] = useState();
    const [infoFile, setInfoFile] = useState({});
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    async function loadMusic() {
        try {
            if (!audio) return;

            const urlMusic = `https://novacancao.azureedge.net/${audio}`
            
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: false,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix
            });


            const { sound } = await Audio.Sound.createAsync(
                { uri: urlMusic },
                { shouldPlay: false }
            );
            setSound(sound);

            sound.setOnPlaybackStatusUpdate(setInfoFile);
        } catch (error) {
            console.log('Deu erro: ', error);
            const notFoundMessage = 'Não foi possível carregar a música';

            return show(notFoundMessage, { type: 'danger' });

        }
    }

    async function playOrPauseSound(params) {
        if (musicStarted) {
            params.includes('play') ? sound.playAsync() : sound.pauseAsync();
            return;
        }

        if (!params.includes('open')) {
            await sound.playAsync();
            setMusicStarted(true);
        }
    }

    useEffect(() => {
        let timeM = infoFile.positionMillis / 1000;
        let du = infoFile.durationMillis / 1000;

        (infoFile && infoFile.positionMillis) ? setProgress(timeM) : setProgress(0);
        (infoFile && infoFile.durationMillis) ? setDuration(du) : setDuration(0);
    }, [infoFile]);

    useEffect(() => {
        setIsMounted(!isMounted);
        loadMusic();
    }, []);

    useEffect(() => {
        return () => {
            sound && sound.unloadAsync();
            setIsMounted(!isMounted);
        }
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
        setShowButtonPlay(Boolean(audio));
    }, [audio])

    const showModalMusicAudio = () => {
        modalizeRef.current?.open();
    }

    const playOrPause = () => {
        if (typeIcon === 'play-arrow') {
            setTypeIcon('pause');
            playOrPauseSound('play');
        }
        else {
            setTypeIcon('play-arrow');
            playOrPauseSound('pause');
        }
    }

    const forwardButton = () => {
        if (infoFile && infoFile.positionMillis) sound.setPositionAsync(infoFile.positionMillis + 10000);
    }

    const backwardButton = () => {
        if (infoFile && infoFile.positionMillis) sound.setPositionAsync(infoFile.positionMillis - 10000);
    }

    const advancedMusic = ({ status, value }) => {
        let timeMusic = value * 1000;

        if (status == 'start') {
            playOrPauseSound('pause');
            setTypeIcon('play-arrow');
        }

        if (status == 'completed') {

            if (timeMusic >= infoFile.positionMillis) {
                sound.setPositionAsync(timeMusic);
                playOrPauseSound('play');
                setTypeIcon('pause');
                return;
            }

            if (timeMusic <= infoFile.positionMillis) {
                sound.setPositionAsync(timeMusic);
                playOrPauseSound('play');
                setTypeIcon('pause');
                setProgress(timeMusic);
                return;
            }
        }

    }

    const formatTime = (number) => {
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number % 60);

        const minutesFormated = String(minutes).padStart(2, '0');
        const secondsFormated = String(seconds).padStart(2, '0');

        return `${minutesFormated}:${secondsFormated}`;
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

            {showButtonPlay &&
                <TouchableOpacity style={style.floatButtom} onPress={showModalMusicAudio}>
                    <MaterialIcons name="audiotrack" size={24} color="#fff" />
                </TouchableOpacity>
            }
            {isMounted &&
                <Modalize ref={modalizeRef}
                    // snapPoint={330} tem que ter o valor menor que o modalHeight
                    modalHeight={270}
                    modalStyle={{ backgroundColor: themes.dark.colors.card, padding: 30 }}
                    handleStyle={{ backgroundColor: "gray" }}
                    handlePosition='inside'
                    withOverlay={false}
                    disableScrollIfPossible={true}
                    velocity={1}
                    onOpened={() => {
                        setMarginText('270px');
                    }}
                    onClosed={() => {
                        setMarginText('60px');
                    }}
                    scrollViewProps={{ scrollEnabled: false, showsVerticalScrollIndicator: false }}
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
                                value={progress}
                                minimumValue={0}
                                maximumValue={duration}
                                maximumTrackTintColor='gray'
                                minimumTrackTintColor='#0B97D3'
                                thumbTintColor='#0B97D3'
                                onSlidingStart={value => advancedMusic({ status: 'start', value: value })}
                                onSlidingComplete={value => advancedMusic({ status: 'completed', value: value })}
                            />
                        </View>

                        <ProgressNummber>
                            <Time> {formatTime(progress)} </Time>
                            <Time> {formatTime(duration)} </Time>
                        </ProgressNummber>

                        <MusicControl>
                            <TouchableOpacity onPress={backwardButton}>
                                <MaterialIcons name="replay-10" size={40} color='#FFF' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={playOrPause} style={style.playAndPause}>
                                <MaterialIcons name={typeIcon} size={40} color='#fff' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={forwardButton}>
                                <MaterialIcons name="forward-10" size={40} color='#FFF' />
                            </TouchableOpacity>
                        </MusicControl>
                    </ProgressConstainer>
                </Modalize>
            }
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