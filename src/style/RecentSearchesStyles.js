import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    titleHeader: {
        color: '#FFFF',
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 35
    },
    wrapperButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    textButton: {
        color: '#FFF',
        paddingLeft: 10,
        fontSize: 16,
        lineHeight: 50
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        lineHeight: 50,
    }

})