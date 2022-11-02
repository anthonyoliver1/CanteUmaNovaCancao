import axios from 'axios';
import { Alert, ToastAndroid } from 'react-native';
import { typeDevice } from '../utils/Index';

export async function callApiMethodGet(
    base_url,
    endpoint
) {
    const url = base_url + endpoint;

    try {
        const headers = {
            'Content-Type': 'application/json',
            'user-agent': 'CUNC-APP'
        }
        const { data } = await axios.get(url, headers);
        return data;
    } catch (error) {
        const messageError = 'Não foi possível carregar as músicas, feche e abra o app!'

        typeDevice.iOS() ?
            Alert.alert('Houve um erro', messageError, [
                {
                    text: 'Fechar'
                }
            ])
        : ToastAndroid.show(messageError, ToastAndroid.LONG)

        console.error('Não foi possivel fazer a requisição', error)
    }
}