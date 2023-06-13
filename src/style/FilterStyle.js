import styled, { css } from "styled-components/native";

export const Container = styled.View`
    padding: 7px 5px 7px;
`;

export const FilterContainer = styled.View`
    display: flex;
    justify-content: center;
`;

export const Wrapper = styled.View`
    background-color: #1A1A1A3A;
    border-radius: 20px;
    padding: 10px 20px;
    margin-horizontal: 4px;

    ${props =>
        props.selected && css`
            background-color: ${props => props.theme.colors.primary};
            border-radius: 30px;
        `
    }
`;

export const TextButton = styled.Text`
    color: #FFFFFF;
    font-size: 13px;

    ${props =>
        props.selected && css`
            font-weight: 700;
        `
    }
`;