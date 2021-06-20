import React, { useContext } from "react";
import { Icon, SocialIcon as NativeSocialIcon, SocialIconProps } from "react-native-elements";

import { GlobalContext } from "../context/GlobalContext";
import useColors from "../hooks/useColors";
import useLinker from "../hooks/useLinker";
import FlexView from "./FlexView";

import { Image, TouchableOpacity, TouchableHighlight, View, Linking } from "react-native";
import { BILI, IS_DESKTOP } from "../constants/dimension";

const SocialIcons = () => {
    const { darkMode } = useContext(GlobalContext);
    const { background, textLight } = useColors();
    const onPressTwitter = useLinker("https://twitter.com/sushiswap", "", "_blank");
    const onPressGithub = useLinker("https://github.com/sushiswap", "", "_blank");
    const onPressDiscord = useLinker("https://discord.gg/YS8xH7E", "", "_blank");

    const icon1_1 = { uri: require("../../assets/icon1_1.png") };
    const icon1_2 = { uri: require("../../assets/icon1_2.png") };
    const icon2_1 = { uri: require("../../assets/icon2_1.png") };
    const icon2_2 = { uri: require("../../assets/icon2_2.png") };
    const icon3_1 = { uri: require("../../assets/icon3_1.png") };
    const icon3_2 = { uri: require("../../assets/icon3_2.png") };

    return (
        <FlexView style={{
            width: "100%",
            justifyContent: "center",
            position: IS_DESKTOP ? 'absolute' : 'static',
            left: '10%',
            top: '20px'
        }}>
            {/* <SocialIcon type="github-alt" onPress={onPressGithub} />
            <SocialIcon type="twitter" onPress={onPressTwitter} />
            <Icon
                type={"material-community"}
                name={"discord"}
                raised={true}
                reverse={true}
                color={background}
                reverseColor={darkMode ? "white" : "#7289da"}
                style={{ backgroundColor: background }}
                containerStyle={{
                    borderWidth: 1,
                    borderColor: darkMode ? "white" : textLight
                }}
                onPress={onPressDiscord}
            /> */}

            <TouchableOpacity style={{ width: 35 }} onPress={() => { window.open("https://github.com/ironminter/shabushabu"); }}>
                <Image style={{ height: 24 * BILI, width: 24 * BILI }}
                    source={darkMode ? icon1_2 : icon1_1}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 35 }} onPress={() => { window.open("Https://twitter.com/shabufinance"); }}>
                <Image style={{ height: 24 * BILI, width: 24 * BILI }}
                    source={darkMode ? icon2_2 : icon2_1}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 35 }} onPress={() => { window.open("https://medium.com/@shabushabu"); }}>
                <Image style={{ height: 24 * BILI, width: 24 * BILI }}
                    source={darkMode ? icon3_2 : icon3_1}
                />
            </TouchableOpacity>
        </FlexView>
    );
};

const SocialIcon = (props: SocialIconProps) => {
    const { darkMode } = useContext(GlobalContext);
    const { background, textLight } = useColors();
    return (
        <NativeSocialIcon
            {...props}
            light={!darkMode}
            iconColor={darkMode ? "white" : undefined}
            style={{
                backgroundColor: background,
                borderWidth: 1,
                borderColor: darkMode ? "white" : textLight
            }}
        />
    );
};

export default SocialIcons;
