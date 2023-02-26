import { useToast } from 'react-native-toast-notifications';
import { OsDevice } from '../utils';

export async function callApi(
    base_url,
    endpoint,
    method
) {
    try {
        const url = base_url + endpoint;
        const headers = {
            'Content-Type': 'application/json',
            'user-agent': `CUNC-APP-${OsDevice()}`
        };

        const response = await fetch(url, {
            method: method,
            headers
        });

        return response.json();
    } catch (error) {
        const messageError = 'Não foi possível carregar as músicas, feche e abra o app amor 😅';
        const { show } = useToast();

        show(messageError, { type: 'danger' });
        console.error('Não foi possivel fazer a requisição', error.error);
    }
}
