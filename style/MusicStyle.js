import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 10px;
    align-items: center;
    min-width: 100%;
    height:100%;
`;

export const MusicLetter = styled.Text`
    text-align: center;
    line-height: 25px;
    font-size: 16px;
    margin-bottom: ${props => props.margin+'px'};
    color: ${props => props.theme.color};
`;

export const ContentHeader = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
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
    top: 10px;
    height: 100px;
`;


