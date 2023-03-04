import styled , { css } from "styled-components/native";

export const Cipher = styled.Text`
    text-align: justify;
    line-height: 25px;
    font-size: 16px;
    margin-bottom: ${props => props.margin ? props.margin : '60px'};
    color: ${props => props.isCipher ? 'red' :  props.theme.color};
    padding: 5px 10px;
`;