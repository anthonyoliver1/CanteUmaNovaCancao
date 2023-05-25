import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, PitchCorrectionQuality } from 'expo-av';
import { Wrapper } from '../../../style';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard'
import * as Haptics from 'expo-haptics';
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
    WrapperMusicName,
    style
} from '../../style/MusicStyle';
import { useToast } from 'react-native-toast-notifications';
import { typeDevice } from '../../utils';

export default function Music({ route, navigation }) {
    const {
        musicTxt,
        audio,
        author,
        musicTitle,
        image,
        isCipher,
        cipher,
        isVideo,
        linkVideo,
        number
    } = route.params;

    const { show } = useToast();

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'undefined': require('../../assets/cunc.png')
    }

    const modalizeRef = useRef(null);
    const menuModalRef = useRef(null);

    const [showButtonPlay, setShowButtonPlay] = useState(undefined);
    const [typeIcon, setTypeIcon] = useState('play');
    const [musicStarted, setMusicStarted] = useState(false);
    const [sound, setSound] = useState();
    const [infoFile, setInfoFile] = useState({});
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [positionModal, setPositionModal] = useState('');
    const [dataList, setDataList] = useState([]);

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
            const notFoundMessage = 'Não foi possível carregar a música';

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

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={openModalMenu} android_disableSound={true}>
                    <View style={[style.headerContainer]}>
                        <View style={[style.headerButton]}>
                            <Entypo name="dots-three-horizontal" size={15} color="#FFF" />
                        </View>
                    </View>
                </Pressable>
            ),
        });
    }, [navigation]);

    const openModalMenu = () => {
        menuModalRef.current?.open();
    }
    const closeModalMusicAudio = () => {
        setPositionModal('initial');
        modalizeRef.current?.close();
    }

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

    const copyText = () => {
        const copyMusic = `${musicTitle}\n${author}\n\n${musicTxt}`;

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert(
            'Deseja copiar ?',
            `Você quer copiar a música ${musicTitle} - ${author} ?`,
            [
                {
                    text: 'Copiar',
                    onPress: async () => await Clipboard.setStringAsync(copyMusic)
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        );
    }

    useEffect(() => {
        const list = [
            { id: 1, label: 'Compartilhar', visible: true, icon: 'share', fun: 'sharing' },
            { id: 2, label: `Baixar - ${musicTitle}`, icon: 'download', visible: true, disabled: true },
            { id: 3, label: 'Ver no YouTube', icon: 'logo-youtube', subId: 'video', visible: false, fun: 'videos' },
            { id: 4, label: 'Ir para cifra', icon: 'open', subId: 'cifra', visible: false, fun: 'ciphers' },
        ]

        list.forEach((element) => {
            if (element.subId) {
                if ([isCipher].includes(element.subId)) {
                    element.visible = true
                }

                if ([isVideo].includes(element.subId)) {
                    element.visible = true
                }
            }
        })
        setDataList(list);
    }, []);

    const goToVideo = () => Linking.openURL(linkVideo);

    const sharingMusic = async () => {
        try {
            let linkShare = `${musicTitle}\n${author}\n\n${musicTxt}`;

            if (typeDevice.Android())
                linkShare += '\n\n https://play.google.com/store/apps/details?id=br.org.icoc.novacancao';

            await Share.share({
                message: linkShare,
                url: 'https://apple.com/br',
                title: 'Cante Uma Nova Canção'
            });

        } catch (error) {
            alert(error.message);
        }
    }

    const goToCipher = () => {
        navigation.navigate(
            'Home',
            {
                screen: 'MusicCipherInHome',
                params: {
                    numMusic: number,
                    musicTitle: musicTitle,
                    author: author,
                    cipher: cipher
                },
            }
        )
    };

    const renderItem = ({ item, separators }) => {
        const pressed = (param) => {
            const action = {
                sharing: () => sharingMusic(),
                videos: () => goToVideo(),
                ciphers: () => goToCipher()
            }

            action[param]();
        }

        return (
            <>
                {
                    item.visible &&
                    <View>
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => pressed(item.fun)}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}
                            activeOpacity={0.4}
                            style={{ width: '100%', opacity: item.disabled && 0.5 }}
                            disabled={item.disabled}
                        >
                            <View style={[style.modalButtons]}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Ionicons name={item.icon} size={20} color="#FFF" />
                                    <Text style={[style.textButton]} numberOfLines={1}>
                                        {item.label}
                                    </Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {
                                        item.disabled &&
                                        <Text style={{ color: themes.dark.colors.primary }}>Em breve!</Text>
                                    }
                                    <MaterialIcons name="keyboard-arrow-right" size={20} color={themes.dark.colors.primary + '90'} />
                                </View>
                            </View>
                        </TouchableOpacity >
                    </View >
                }
            </>
        )
    };

    const renderSeparator = ({ leadingItem, highlighted }) => {
        return (
            <>
                {
                    leadingItem.visible &&
                    <View style={[style.separator]} />
                }
            </>
        )
    };

    return (
        <Wrapper>
            <ScrollView>
                <Container>
                    <MusicLetter onLongPress={copyText} suppressHighlighting>
                        {musicTxt}
                    </MusicLetter>
                </Container>
            </ScrollView>

            <Modalize
                ref={menuModalRef}
                onOpen={closeModalMusicAudio}
                onClose={showModalMusicAudio}
                threshold={50}
                handlePosition='inside'
                adjustToContentHeight
                handleStyle={{
                    backgroundColor: "#FFFFFF25"
                }}
                modalStyle={{
                    backgroundColor: themes.dark.colors.card,
                }}
                flatListProps={
                    {
                        data: dataList,
                        renderItem: renderItem,
                        ItemSeparatorComponent: renderSeparator,
                        keyExtractor: (item) => item.id,
                    }
                }
            >
            </Modalize>

            {(isMounted && showButtonPlay) &&
                <Modalize
                    ref={modalizeRef}
                    alwaysOpen={60}
                    modalHeight={445}
                    velocity={100}
                    threshold={200}
                    handlePosition='inside'
                    withHandle={positionModal === 'top'}
                    withOverlay={false}
                    disableScrollIfPossible
                    tapGestureEnabled
                    useNativeDriver
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
                                <Pressable
                                    onPress={() => {
                                        setPositionModal('top')
                                        modalizeRef.current?.open('top')
                                    }}
                                    style={{ width: '85%' }}
                                >
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
                                </Pressable>
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
                                <MusicName numberOfLines={1}>
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
                                        maximumTrackTintColor='#FFFFFF50'
                                        minimumTrackTintColor={themes.dark.colors.primary}
                                        thumbTintColor={themes.dark.colors.primary}
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
