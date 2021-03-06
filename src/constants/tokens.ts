import { ethers } from "ethers";
import Token from "../types/Token";

export const ETH: Token = {
    name: "Ethereum",
    address: ethers.constants.AddressZero,
    decimals: 18,
    symbol: "ETH",
    logoURI: "https://www.kobeswap.org/images/tokens/ETH.png",
    balance: ethers.BigNumber.from(0)
};
