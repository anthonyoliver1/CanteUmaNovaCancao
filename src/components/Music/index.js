import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, PitchCorrectionQuality } from 'expo-av';
import { Wrapper } from '../../../style';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import themes from '../../style/themes';
import {
    AuthorMusic,
    AuthorMusicMiniPlayer,
    Container,
    ContainerMiniPlayer,
    ContainerModal,
    ContentHeader,
    ContentMusicName,
    MusicControl,
    MusicLetter,
    MusicName,
    MusicNameMiniPlayer,
    ProgressConstainer,
    ProgressNummber,
    Time,
    WarpperMiniPlayer,
    WrapperMusicName
} from '../../style/MusicStyle';
import { useToast } from 'react-native-toast-notifications';

export default function Music({ route }) {
    const { musicTxt, audio, author, musicTitle, image } = route.params;
    const { show } = useToast();

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/cunc.png')
    }

    const modalizeRef = useRef(null);

    const [showButtonPlay, setShowButtonPlay] = useState(undefined);
    const [typeIcon, setTypeIcon] = useState('play');
    const [musicStarted, setMusicStarted] = useState(false);
    const [sound, setSound] = useState();
    const [infoFile, setInfoFile] = useState({});
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [positionModal, setPositionModal] = useState('');

    async function loadMusic() {
        try {
            if (!audio) return;

            const source = {
                uri: encodeURI(`https://novacancao.azureedge.net/${audio}`)
            };

            const initialStatus = {
                shouldPlay: false,
                pitchCorrectionQuality: PitchCorrectionQuality.High,
                shouldCorrectPitch: true
            };

            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: false,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix
            });

            const { sound } = await Audio.Sound.createAsync(
                source,
                initialStatus
            );

            setSound(sound);

            sound.setOnPlaybackStatusUpdate(setInfoFile);
        } catch (error) {
            console.log('Deu erro: ', error);
            const notFoundMessage = 'Não foi possível carregar a música baby 😢';

            return show(notFoundMessage, { type: 'danger' });
        }
    }

    async function playOrPauseSound(params) {
        if (musicStarted) {
            params.includes('play') ? await sound.playAsync() : await sound.pauseAsync();
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
        if (progress > 0 && progress === duration) {
            setTypeIcon('play');
            sound.pauseAsync();
            sound.setPositionAsync(0);
        }
    }, [progress, duration, sound]);

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
        if (typeIcon === 'play') {
            setTypeIcon('pause');
            playOrPauseSound('play');
        }

        if (typeIcon === 'pause' && progress > 0) {
            setTypeIcon('play');
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
            setTypeIcon('play');
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

    const ProgressBar = ({ progress = 0, duration }) => {
        const [width, setWidth] = useState('0%');

        useEffect(() => {
            const musicPercent = ((progress / duration) * 100) || 0;
            setWidth(`${musicPercent}%`);
        }, [progress])

        return (
            <View style={style.container}>
                <View style={[style.progress, { width }]} />
            </View>
        );
    }

    return (
        <Wrapper>
            <ScrollView>
                <Container>
                    <MusicLetter>
                        {musicTxt}
                    </MusicLetter>
                </Container>
            </ScrollView>

            {/* {showButtonPlay &&
                <TouchableOpacity style={style.floatButtom} onPress={showModalMusicAudio}>
                    <MaterialIcons name="audiotrack" size={24} color="#fff" />
                </TouchableOpacity>
            } */}
            {(isMounted && showButtonPlay) &&
                <Modalize
                    ref={modalizeRef}
                    alwaysOpen={60}
                    modalHeight={445}
                    handlePosition='inside'
                    withHandle={positionModal === 'top'}
                    withOverlay={false}
                    disableScrollIfPossible={true}
                    tapGestureEnabled={true}
                    useNativeDriver={true}
                    velocity={1}
                    panGestureComponentEnabled={true}
                    onPositionChange={setPositionModal}
                    scrollViewProps={
                        {
                            scrollEnabled: false,
                            showsVerticalScrollIndicator: false
                        }
                    }
                    modalStyle={
                        {
                            backgroundColor: themes.dark.colors.card,
                            padding: positionModal == 'top' ? 30 : 10,
                        }
                    }
                    handleStyle={
                        {
                            backgroundColor: "gray"
                        }
                    }
                    HeaderComponent={
                        positionModal !== 'top' &&
                        <ContainerMiniPlayer>
                            <WarpperMiniPlayer>
                                <ContentMusicName>
                                    <Image
                                        style={{ width: 40, height: 40, borderRadius: 8 }}
                                        source={data[image]}
                                    />
                                    <WrapperMusicName>
                                        <MusicNameMiniPlayer numberOfLines={1}>
                                            {musicTitle}
                                        </MusicNameMiniPlayer>
                                        <AuthorMusicMiniPlayer>
                                            {author}
                                        </AuthorMusicMiniPlayer>
                                    </WrapperMusicName>
                                </ContentMusicName>
                                <TouchableOpacity onPress={playOrPause} style={style.playOrPause}>
                                    <FontAwesome5 name={typeIcon} size={20} color='#fff' />
                                </TouchableOpacity>
                            </WarpperMiniPlayer>
                            <ProgressBar key={'progresBar'} progress={progress} duration={duration} />
                        </ContainerMiniPlayer>
                    }
                >
                    {positionModal === 'top' &&
                        <ContainerModal>
                            <Image
                                style={{ width: 200, height: 200, borderRadius: 8 }}
                                source={data[image]}
                            />
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

                                    <TouchableOpacity onPress={playOrPause}
                                        style={
                                            [
                                                style.playAndPause,
                                                { paddingLeft: typeIcon === 'play' ? 3.5 : 0 }
                                            ]
                                        }
                                    >
                                        <FontAwesome5 name={typeIcon} size={23} color='#fff' />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={forwardButton}>
                                        <MaterialIcons name="forward-10" size={40} color='#FFF' />
                                    </TouchableOpacity>
                                </MusicControl>
                            </ProgressConstainer>
                        </ContainerModal>
                    }
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
        justifyContent: 'center',
        alignContent: 'center'
    },
    playOrPause: {
        paddingRight: 15
    },
    container: {
        width: '100%',
        height: 2,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        top: 5
    },
    progress: {
        height: 2,
        backgroundColor: '#0B97D3',
    },
});