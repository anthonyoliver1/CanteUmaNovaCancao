import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding-top: 5px;
`;

export const Wrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
`;

export const List = styled.View`
    padding: 15px;
    margin-vertical: 4px;
    background-color: ${props => props.theme.colors.card};
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
`;

export const InfoMusic = styled.View`
    width:  ${props => props.width - 90 + 'px'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`;
