import styled from 'styled-components/native';

export const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.background};
`;
    
export const Title =  styled.Text`
    color: ${props => props.theme.color};
    font-size: 16px;
`;

export const Author = styled.Text`
    color: gray;
`;

export const Kids = styled.Text`
    color: #5bc8f5;
    font-size: 16px;
`;

export const ButtonTitle =  styled.Text`
    color: #FFFFFFFF;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;