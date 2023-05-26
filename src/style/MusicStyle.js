import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import themes from "./themes";
import { typeDevice } from "../utils";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    min-width: 100%;
    height: 100%;
`;

export const MusicLetter = styled.Text`
    text-align: center;
    line-height: 25px;
    font-size: 16px;
    margin-bottom: 60px;
    color: ${props => props.theme.color};
`;

export const ContainerModal = styled.View`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const ContentHeader = styled.View`
    align-items: center;
    justify-content: center;
    margin: 15px 0;
`;

export const MusicName = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.color};
`;

export const AuthorMusic = styled.Text`
    font-size: 15px;
    font-weight: 200;
    color: ${props => props.theme.color};
`;

export const ProgressConstainer = styled.View`
    width: 100%;
    justify-content: center;
`;

export const ProgressNummber = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    bottom: 5px;
`;

export const Time = styled.Text`
    font-size: 13px;
    color: ${props => props.theme.color};
`;

export const MusicControl = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 85px;
`;

export const ContainerMiniPlayer = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const WarpperMiniPlayer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const ContentMusicName = styled.View`
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
`;

export const WrapperMusicName = styled.View`
    display: flex;
    padding-left: 15px;
    width: 80%;
`;

export const MusicNameMiniPlayer = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.color};
    
    max-width: 230px;
`;

export const AuthorMusicMiniPlayer = styled.Text`
    font-size: 12px;
    font-weight: 500;
    opacity: 0.5;
    color: ${props => props.theme.color};
`;

export const style = StyleSheet.create({
    playAndPause: {
        backgroundColor: themes.dark.colors.primary,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    playOrPause: {
        paddingRight: 15
    },
    container: {
        width: '100%',
        height: 2,
        backgroundColor: '#FFFFFF50',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        top: 5
    },
    progress: {
        height: 2,
        backgroundColor: themes.dark.colors.primary,
    },
    headerContainer: {
        right: typeDevice.Android() ? 15 : 10,
    },
    headerButton: {
        backgroundColor: themes.dark.colors.primary + '50',
        padding: 5,
        borderRadius: 20,
    },
    modalButtons: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textButton: {
        color: '#FFF',
        marginLeft: 10,
        width: Dimensions.get('screen').width - 180
    },
    separator: {
        height: 1,
        backgroundColor: themes.dark.colors.primary,
        width: '95%',
        alignSelf: 'center',
        opacity: 0.2
    }
});