import styled, { css } from "styled-components/native";

export const Container = styled.View`
    padding: 7px 5px 7px;
`;

export const FilterContainer = styled.View`
    display: flex;
    justify-content: center;
`;

export const Wrapper = styled.View`
    background-color: #1A1A1A7A;
    border-radius: 20px;
    padding: 10px 20px;
    margin-horizontal: 4px;

    ${props =>
        props.selected && css`
            background-color: ${props => props.theme.colors.card};
            padding: 15px 25px;
            border-radius: 30px;
        `
    }
`;

export const TextButton = styled.Text`
    color: #FFFFFFA9;
    font-size: 13px;

    ${props =>
        props.selected && css`
            color: #FFFFFF;
            font-weight: 700;
        `
    }
`;