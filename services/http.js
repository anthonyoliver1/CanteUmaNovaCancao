import { callApiMethodGet } from './api';

const BASE_URL = __DEV__ ? 'http://192.168.0.104:8000/' : '';

export const getAllMusics = async () => {
    return await callApiMethodGet(
        BASE_URL,
        'api/cunc/get-all-musics'
    )
};