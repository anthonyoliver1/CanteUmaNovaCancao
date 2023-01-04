import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
`;

export const Wrapper = styled.View`
    flex: 1;
    align-items: center;
    padding: 10px;
    min-width: 100%;
`;

export const Description = styled.Text`
    margin-bottom: 30px;
    text-align: justify;
    padding: 25px;
    color: ${props => props.theme.color}
`;

export const AboutButton = styled.Pressable`
    border-radius: 20px;
    padding: 10px;
    width: 160px;
    margin-bottom: 10px;
`;

export const ContainerModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #0000002b;
`;

export const ModalWrapper = styled.View`
    margin: 20px;
    background-color: #9f9f9f;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    minWidth: 80%;
`;

export const ModalTitle = styled.Text`
    margin-bottom: 15px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #ffff;
`;

export const ModalContent = styled.View`
    display: flex;
    align-items: stretch;
    flex-direction: column;
`;

export const VersionApp = styled.Text`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #ffff;
    text-align: center;
    padding: 20px;
    margin-top: 60px;
    background-color: #3B3B3B;
    border-radius: 20px;
    overflow: hidden;

`;