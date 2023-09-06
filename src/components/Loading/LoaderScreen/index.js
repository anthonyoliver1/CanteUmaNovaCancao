import React from "react";
import { styles } from "../../../style/LoaderScreenStyle";
import { MotiImage, MotiView } from 'moti';
import { View } from "react-native";

export default function Loader() {
    return (
        <View
            style={[styles.container]}
        >
            <MotiImage
                animateInitialState={true}
                from={{
                    translateY: -30,
                }}
                animate={{
                    translateY: 0,
                    opacity: 1
                }}
                transition={{
                    type: 'timing',
                    duration: 1000,
                    repeat: 4
                }}

                style={[{ width: '50%', height: '100%' }]}
                source={require('../../../assets/splash_logo.png')}
            />
        </View>
    )
}