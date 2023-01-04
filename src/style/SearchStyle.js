import styled from "styled-components/native";

export const Container = styled.View`
    align-items: center;
    padding-top: 20px;
    width: 100%;
    height: 100%;
    flex: 1;
`;

export const SearchInput = styled.TextInput`
    border-width: 2px;
    border-radius: 20px;
    border-color: #0B97D3;
    height: 40px;
    padding: 10px;
    margin-bottom: 10px;
    width: 90%;
    color: ${props => props.theme.color};
`;

export const SearchButton = styled.Pressable`
    border-radius: 20px;
    padding: 10px;
    width: 160px;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const ListView = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
`;