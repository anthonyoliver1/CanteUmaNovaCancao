import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

export const Wrapper = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    line-height: 20px;
    display: flex;
    margin: 20px;
    text-align: justify;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: 700;
`;

export const AppName = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    ${({ isLink, theme }) => isLink &&
        `   
            text-decoration: underline ${theme.colors.primary}
            font-weight: 700;
            top: 3.5px;
        `
    }
`;

export const Subtitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
`;

export const MiddleTitle = styled.Text`
    font-size: 13px;
    font-weight: 700;
`;