import { callApi } from "./api";

const BASE_URL = __DEV__ ? 'http://192.168.0.100:5000/' : '';

export const getAllMusics = async () => {
    return await callApi(
        BASE_URL,
        'api/cunc/get-all-musics',
        'GET'
    );
};
