import React, { FC, useContext } from "react";
import { Image, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { Link, useRouteMatch } from "react-router-dom";

import { BILI, HEADER_HEIGHT, HEADER_WIDTH, IS_DESKTOP, Spacing } from "../../constants/dimension";
import { EthersContext } from "../../context/EthersContext";
import { GlobalContext } from "../../context/GlobalContext";
import useColors from "../../hooks/useColors";
import useTranslation from "../../hooks/useTranslation";
import DarkModeSwitch from "../DarkModeSwitch";
import FlexView from "../FlexView";
import SvgLogoDark from "../svg/SvgLogoDark";
import SvgLogoLight from "../svg/SvgLogoLight";
import Text from "../Text";

export interface WebHeaderProps {
    onExpandMenu?: () => void;
}

const WebHeader: FC<WebHeaderProps> = props => {
    const { header, borderDark } = useColors();

    return (
        <View
            // @ts-ignore
            style={{
                position: "fixed",
                top: 0,
                zIndex: 100,
                width: "100%",
                height: HEADER_HEIGHT,
                paddingBottom: Spacing.small,
            }}>
            <FlexView
                style={{
                    flex: 1,
                    width: IS_DESKTOP ? HEADER_WIDTH : "100%",
                    alignSelf: "center",
                    justifyContent: "space-evenly",
                    alignItems: "flex-end",
                    paddingTop: Spacing.small,
                }}>
                <Title />

                {IS_DESKTOP ? <Menu /> : <MenuIcon onExpand={props.onExpandMenu} />}

                {/* <FlavorForm /> */}
            </FlexView>
        </View>
    );
};

export const Title = () => {
    const { darkMode } = useContext(GlobalContext);

    // const logo1 = { uri: require("../../../assets/logo-1.png") };
    // const logo2 = { uri: require("../../../assets/logo-2.png") };

    const logo = { uri: require('../../../assets/logo.png') };

    const SvgLogo = logo;

    return (
        <View style={{ alignSelf: "center" }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
                {/* <SvgLogo width={259} height={45} style={{ marginTop: 8, marginLeft: -16 }} /> */}
                <Image
                    source={SvgLogo}
                    style={{
                        marginTop: 0,
                        marginLeft: 0,
                        width: 253 * BILI,
                        height: 60 * BILI
                    }}
                />
            </Link>
        </View>
    );
};

const Menu = () => {
    const t = useTranslation();
    return (
        <FlexView
            style={{
                height: "100%",
                alignItems: "center"
            }}>
            <MenuItem title={t("menu.home")} path={"/"} iconSrc={require("../../../assets/icon-home.png")} />
            <MenuItem title={t("menu.swap")} path={"/swap"} iconSrc={require("../../../assets/icon-swap.png")} />
            <MenuItem title={t("menu.liquidity")} path={"/liquidity"} iconSrc={require("../../../assets/icon-liq.png")} />
            <MenuItem title={t("menu.migrate")} path={"/migrate"} iconSrc={require("../../../assets/icon-mig.png")} />
            {/* <MenuItem title={t("menu.stake")} path={"/staking"} /> */}
            {/* <MenuItem title={t("menu.farm")} path={"/farming"} /> */}
            <DarkModeSwitch style={{ marginLeft: Spacing.small }} />
            <Status />
        </FlexView>
    );
};

const MenuItem = ({ title, path, iconSrc }) => {
    const { textDark, textLight } = useColors();
    const match = useRouteMatch(path);
    const active = (path === "/" ? match?.isExact : true) && match?.path?.startsWith(path);
    return (
        <Link to={path} style={{
            marginLeft: Spacing.normal,
            marginBottom: -4,
            textDecoration: "none",
            borderBottomWidth: active ? '1px' : '0px',
            borderBottomColor: active ? '#F9A428' : '#000000',
            borderBottomStyle: 'solid',
            height: '100%'
        }}>
            <img src={iconSrc} width={18 * BILI} height={18 * BILI} />
            <Text
                style={{
                    fontFamily: "regular",
                    fontSize: 16 * BILI,
                    // color: active ? "#FF3333" : textLight,
                    padding: 3,
                    marginLeft: '5px',
                    // lineHeight: '100%'
                }}>
                {title}
            </Text>
        </Link>
    );
};

const MenuIcon = ({ onExpand }) => {
    const { textDark } = useColors();
    return <Icon type={"material-community"} name={"menu"} size={28} color={textDark} onPress={onExpand} />;
};

const Status = () => {
    const t = useTranslation();
    const { textLight, green, borderDark } = useColors();
    const { ethereum, chainId, address, ensName } = useContext(EthersContext);
    const connected = chainId === 1 && address;
    const title = connected
        ? ensName || address!.substring(0, 6) + "..." + address!.substring(address!.length - 4, address!.length)
        : t("menu.not-connected");
    const color = connected ? green : textLight;
    const onPress = () => {
        if (confirm(t("do-you-want-to-disconnect"))) ethereum?.disconnect?.();
    };
    return (
        <TouchableHighlight onPress={onPress} disabled={!ethereum?.isWalletConnect}>
            <FlexView
                style={{
                    backgroundColor: '#D7A235',
                    height: 59 * BILI,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 100,
                    paddingHorizontal: Spacing.small,
                    borderRadius: 30
                }}>
                {/* <View style={{ backgroundColor: color, width: 6, height: 6, borderRadius: 3, marginRight: 12 }} /> */}
                <Text style={{ fontSize: 18 * 0.67, color: '#000', marginRight: 2 }}>{title}</Text>
                {ethereum?.isWalletConnect && <CloseIcon />}
            </FlexView>
        </TouchableHighlight>
    );
};

const CloseIcon = () => {
    const { textLight } = useColors();
    return (
        <Icon
            type={"material-community"}
            name={"close"}
            size={15}
            color={textLight}
            style={{ paddingLeft: 2, paddingTop: 2 }}
        />
    );
};

const FLAGS = {
    us: require("../../../assets/flags/us.png"),
    cn: require("../../../assets/flags/cn.png"),
    kr: require("../../../assets/flags/kr.png"),
    fr: require("../../../assets/flags/fr.png"),
    es: require("../../../assets/flags/es.png"),
    jp: require("../../../assets/flags/jp.png")
};

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <select value={'us'} onChange={this.handleChange}>
                <option value="us" style={{backgroundImage: FLAGS['us'], width: 30, height: 30}}>
                    {/* <Image source={FLAGS['us']} style={{ width: 30, height: 20 }} /> */}
                </option>
                {/* <option value="cn">
                    <Image source={FLAGS['cn']} style={{ width: 30, height: 20 }} />
                </option>
                <option value="kr">
                    <Image source={FLAGS['kr']} style={{ width: 30, height: 20 }} />
                </option>
                <option value="fr">
                    <Image source={FLAGS['fr']} style={{ width: 30, height: 20 }} />
                </option>
                <option value="es">
                    <Image source={FLAGS['es']} style={{ width: 30, height: 20 }} />
                </option>
                <option value="jp">
                    <Image source={FLAGS['jp']} style={{ width: 30, height: 20 }} />
                </option> */}
            </select>
        );
    }
}

export default WebHeader;
