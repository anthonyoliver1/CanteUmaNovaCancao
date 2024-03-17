import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
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
import { typeDevice, verifyUrlConnection } from '../../utils';
import qs from 'qs';
import ConnectionContext from '../../contexts/connection';
import TrackPlayer, { Capability, Event, IOSCategoryOptions, useProgress, useTrackPlayerEvents, State } from 'react-native-track-player';
import MusicContext from '../../contexts/music';
import { EventsTrackerPlayer } from './constants';

export default function Music({ route, navigation }) {
    const {
        musicTxt,
        audio,
        author,
        musicTitle,
        image,
        album,
        isCipher,
        cipher,
        isVideo,
        linkVideo,
        number
    } = route.params;

    const {
        getNetworkStateAsync
    } = useContext(ConnectionContext);

    const {
        isPlayerWorked,
        playerUp
    } = useContext(MusicContext)

    const { show } = useToast();

    const {
        duration,
        position
    } = useProgress();

    const data = {
        'sonho': require('../../assets/o_sonho.png'),
        'caminhos': require('../../assets/caminhos.png'),
        'ICI': require('../../assets/cunc.png')
    }

    const modalizeRef = useRef(null);
    const menuModalRef = useRef(null);

    const [typeIcon, setTypeIcon] = useState('play');
    const [isMounted, setIsMounted] = useState(false);
    const [positionModal, setPositionModal] = useState('');
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        verifyConnectionAndLoadMusic();
        dataModalOptions();
        renderButtonHeaderOptions();

        return () => {
            cleanQueue();
        }
    }, []);

    useEffect(() => {
        if (position > 0 && position >= duration) {
            setTypeIcon('play');
            resetPosition();
        }
    }, [position, duration]);

    const verifyConnectionAndLoadMusic = async () => {
        const response = await getNetworkStateAsync();

        if (response) {
            loadPlayer();
        }
    }

    const cleanQueue = async () => {
        try {
            await TrackPlayer.reset();
        } catch (error) {
            console.error('[CLEAN QUEUE]', error);
        }
    }

    const resetPosition = async () => {
        await TrackPlayer.pause();
        await TrackPlayer.seekTo(0);
    }

    useTrackPlayerEvents(EventsTrackerPlayer, (event) => {
        if ([Event.RemotePlay, Event.RemoteStop].includes(event.type)) {
            setTypeIcon('pause');
        }

        if (event.type === Event.RemotePause) {
            setTypeIcon('play');
        }
    });

    const loadPlayer = async () => {
        try {
            if (!isPlayerWorked) {
                await TrackPlayer.setupPlayer(
                    {
                        minBuffer: 20,
                        maxBuffer: 20,
                        iosCategoryOptions: [IOSCategoryOptions.InterruptSpokenAudioAndMixWithOthers]
                    }
                );

                playerUp(true);
            }

            await TrackPlayer.updateOptions({
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SeekTo,
                ],
                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SeekTo,
                ],

                notificationCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SeekTo,
                ],

                icon: require('../../assets/cunc_icon.png'),
            });

            if (
                (await TrackPlayer.getActiveTrack())?.title === musicTitle &&
                ([State.Playing].includes((await TrackPlayer.getPlaybackState()).state))
            ) {
                setIsMounted(true);
                setTypeIcon('pause');
                return;
            }

            if ((await TrackPlayer.getQueue()).length) {
                cleanQueue();
            }

            const track = {
                title: musicTitle,
                artist: author,
                album: album,
                artwork: data[image],
                url: encodeURI(`https://novacancao.azureedge.net/${audio}`),
            };

            const isLoaded = await verifyUrlConnection(track.url);
            if (!isLoaded) throw 'Houve uma falha ao carregar a música';

            await TrackPlayer.add(track);
            setIsMounted(true);
        } catch (error) {
            const notLoadedMusicMessage = 'Não foi possível carregar a música';
            setIsMounted(false);
            show(notLoadedMusicMessage, { type: 'danger' });
            console.error('[SETUP PLAYER ERROR]', error);
        }
    }

    const playOrPause = async () => {
        if (typeIcon === 'play') {
            setTypeIcon('pause');
            await TrackPlayer.play();
        }

        if (typeIcon === 'pause' && position > 0) {
            setTypeIcon('play');
            await TrackPlayer.pause();
        }
    }

    const forwardButton = async () => {
        await TrackPlayer.seekTo(position + 10);
    }

    const backwardButton = async () => {
        await TrackPlayer.seekTo(position - 10);
    }

    const advancedMusic = async ({ status, value }) => {
        if (status == 'completed') {
            if (value >= position) {
                await TrackPlayer.seekTo(value);
            }

            if (value <= position) {
                await TrackPlayer.seekTo(value);
            }
        }
    }

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

    const renderButtonHeaderOptions = () => {
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
    };

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

    const dataModalOptions = () => {
        const list = [
            { id: 1, label: 'Compartilhar', visible: true, icon: 'share', fun: 'sharing' },
            { id: 2, label: `Baixar - ${musicTitle}`, icon: 'download', visible: true, disabled: true },
            { id: 3, label: 'Ver no YouTube', icon: 'logo-youtube', subId: 'video', visible: false, fun: 'videos' },
            { id: 4, label: 'Ir para cifra', icon: 'open', subId: 'cifra', visible: false, fun: 'ciphers' },
            { id: 5, label: 'Relatar um problema', icon: 'alert-circle', visible: true, fun: 'help' },
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
    };

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

    const submitProblemfound = async () => {
        try {
            const to = 'anthony.silvaoliveira@outlook.com';
            const subject = 'Quero relatar um problema';
            const body = `Olá, \n\n Vi um erro na música ${musicTitle} do autor ${author}! \n\n\n Relate o problema aqui ...`;

            const query = qs.stringify({
                subject,
                body,
                cc: '',
                bcc: ''
            });

            let url = `mailto:${to}?${query}`;

            const canOpen = await Linking.canOpenURL(url);

            if (!canOpen) {
                show('Não foi possível abrir o seu app de email', { type: 'danger' });
            }

            return Linking.openURL(url);

        } catch (error) {
            show('Ops! Houve um erro ao abrir o seu app de email', { type: 'danger' });
        }
    }

    const renderItem = ({ item, separators }) => {
        const pressed = (param) => {
            const action = {
                sharing: () => sharingMusic(),
                videos: () => goToVideo(),
                ciphers: () => goToCipher(),
                help: () => submitProblemfound(),
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

            {(isMounted) &&
                <Modalize
                    ref={modalizeRef}
                    alwaysOpen={60}
                    modalHeight={445}
                    avoidKeyboardLikeIOS={true}
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
                            <ProgressBar key={'progresBar'} progress={position} duration={duration} />
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
                                        value={position}
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
                                    <Time> {formatTime(position)} </Time>
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
