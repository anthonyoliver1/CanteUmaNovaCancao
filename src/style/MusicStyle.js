import styled from "styled-components/native";

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
