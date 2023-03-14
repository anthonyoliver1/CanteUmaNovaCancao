import { callApi } from "./api";
import mock from "../utils/mockMusicData.json"

const BASE_URL = __DEV__ ? 'http://192.168.0.100:5000/' : '';

export const getAllMusics = async () => {

    return mock;
    return await callApi(
        BASE_URL,
        'api/cunc/get-all-musics',
        'GET'
    );
};
