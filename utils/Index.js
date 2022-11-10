import { Platform } from 'react-native';

export const typeDevice = {
    Android: () => {
        if (Platform.OS === 'android')
            return true
    },
    iOS: () => {
        if (Platform.OS === 'ios')
            return true
    },
    web: () => {
        if (Platform.OS === 'web')
            return true
    },
    mobile: () => {
        if (Platform.OS === 'android' || Platform.OS === 'ios')
            return true
    }

}

export const OSDevice = () => {
    switch (Platform.OS) {
        case 'android': return 'Android'
            break;
        case 'ios': return 'iOS'
            break
        default:
            break;
    }
}