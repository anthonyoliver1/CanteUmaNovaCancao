import { Platform } from 'react-native';

export const typeDevice = {
    Android: () => {
        if (Platform.OS === 'android')
            return true;
    },
    iOS: () => {
        if (Platform.OS === 'ios')
            return true;
    },
    web: () => {
        if (Platform.OS === 'web')
            return true;
    },
    mobile: () => {
        if (Platform.OS === 'android' || Platform.OS === 'ios')
            return true;
    }
}

export const OsDevice = () => {
    const action = {
        'android': () => 'Android',
        'ios': () => 'iOS'
    }

    return action[Platform.OS]();
}

export const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const isNull = (value) => {
    return value === null;
}

export const isUndefined = (value) => {
    return value === undefined;
}