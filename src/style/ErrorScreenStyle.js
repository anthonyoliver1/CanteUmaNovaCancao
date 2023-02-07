import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    background: #2A2A2A;
`;
    
export const Wrapper = styled.View`
    height: 90%;
`;

export const MessageErrorTitle = styled.Text`
    font-size: 26px;
    color: #ffff;
    text-align: center;
    font-weight: 700;
`;

export const MessageErrorSubTitle = styled.Text`
    font-size: 16px;
    color: #ffff;
    text-align: center;
    font-weight: 500;
    line-height: 35px;
`;

export const ErrorButton = styled.Pressable`
    border-radius: 20px;
    padding: 10px;
    width: 80%;
    margin-bottom: 10px;

    position: absolute;
    bottom: 10%;
`;