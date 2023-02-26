import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { getAllMusics } from "../service/http";
import mock from "../utils/mockMusicData.json"

const MusicContextData = {
    allMusics: {},
    allCiphers: {},
    refreshing: false,
    getMusics: () => { },
    getStorageMusic: () => { },
    getStorageCipher: () => { },
}

const MusicContext = createContext(MusicContextData);

export function MusicProvider({ children }) {
    const toast = useToast();

    const [allMusics, setAllMusics] = useState({});
    const [allCiphers, setAllCiphers] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const getMusics = async () => {
        try {
            setRefreshing(true);
            const response = mock//await getAllMusics();
            storageMusic(response);

            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            toast.show('Não foi possível carregar as músicas nena 🥺', { type: 'danger' });
        }
    }

    const storageMusic = async (data) => {
        try {
            await AsyncStorage.setItem('@ALL_MUSICS', JSON.stringify(data));
        } catch (error) {
            toast.show('Não foi possível armazenar as musicas no dispositivo gatita 🥺', { type: 'danger' });
        }
    }

    const getStorageMusic = async () => {
        const getMusicInStorage = await AsyncStorage.getItem('@ALL_MUSICS');
        const convertMusicInStorage = JSON.parse(getMusicInStorage);

        setAllMusics(convertMusicInStorage ?? {});
    }

    const getStorageCipher = async () => {
        setRefreshing(true);
        const getMusicInStorage = await AsyncStorage.getItem('@ALL_MUSICS');
        const convertMusicInStorage = JSON.parse(getMusicInStorage);
        const ciphers = convertMusicInStorage?.filter(cipher => cipher.music.cifra);

        setAllCiphers(ciphers ?? {});
        setRefreshing(false);

    }

    return (
        <MusicContext.Provider
            value={{
                allMusics,
                allCiphers,
                refreshing,
                getMusics,
                getStorageMusic,
                getStorageCipher
            }}
        >
            {children}
        </MusicContext.Provider>

    )
}

export default MusicContext