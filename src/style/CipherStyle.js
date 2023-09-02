import styled, { css } from "styled-components/native";

export const Cipher = styled.Text`
    line-height: 30px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 20px;
    left: 20px;
`;

export const Lyrics = styled.Text`
    line-height: 30px;
    font-size: 16px;
    color: ${({ theme }) => theme.color};
`;