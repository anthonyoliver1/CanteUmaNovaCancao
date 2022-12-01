import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    padding: 7px 5px 7px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
`;

export const Wrapper = styled.View`
    border: solid 1px ${props => props.theme.colors.border};
    border-radius: 20px;
    padding: 10px 20px;
    background-color: ${props => props.theme.colors.card};
    margin-horizontal: 4px;
`;

export const TextButton = styled.Text`
    color: #FFFFFF;
    font-size: 13px;
`;