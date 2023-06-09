import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import themes from "./themes";

export const Container = styled.View`
    display: flex;
    align-items: center;
    padding-top: 20px;
    width: 100%;
    height: 100%;
`;

export const SearchInput = styled.TextInput`
    border-width: 2px;
    border-radius: 20px;
    border-color: #0B97D3;
    height: 40px;
    padding: 10px;
    padding-right: 35px;
    width: 100%;
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

export const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingHorizontal: 10
    },
    textCancel: {
        color: themes.dark.colors.primary,
        fontSize: 16
    },
    containerRecentSeaches: {
        paddingHorizontal: 10,
        width: '100%',
        flex: 1,
    },
    positionAndAlingCenter: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cleanInputIcon: {
        height: 30,
        width: 25,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    pressPosition: {
        position: 'relative',
        right: '70%',
    },
})