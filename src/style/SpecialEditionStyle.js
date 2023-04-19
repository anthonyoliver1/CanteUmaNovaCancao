import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;
    
export const Content = styled.Text`
    padding: 20px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 20px;
    display: flex;
    text-align: justify;
`;

export const FeaturedName = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
`;

export const ContainerButton = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 30px 0;
`;

export const MinimalText = styled.Text`
    font-size: 10px;
`;

export const SpecialButton = styled.Pressable`
    border-radius: 20px;
    padding: 10px;
    width: 80%;
`;