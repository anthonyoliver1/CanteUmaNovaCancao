import styled, { css } from "styled-components/native";

export const Cipher = styled.Text`
    text-align: justify;
    line-height: 25px;
    font-size: 16px;
    margin-bottom: 60px;
    color: ${({ theme }) => theme.color};
    padding: 5px 10px;
`;