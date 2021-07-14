import { BigInt } from "@graphprotocol/graph-ts"

// Token addresses
export const addr_bnb = "0x0000000000000000000000000000000000000000"
export const addr_wbnb = "0x27c6487C9B115c184Bb04A1Cf549b670a22D2870"
export const addr_spartav1 = "0x6e812dD5B642334bbd17636d3865CE82C3D4d7eB"
export const addr_spartav2 = "0xd055ADFdD53963F578A929eaA440DBED95407472"
// Contract addresses
export const addr_bondVault = '0x91A0862f8fb5B9b430BF634720114c7173A1D0FC' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_dao = '0x4F45fB8C7cFeAFeFA4B9159F92396dC19B437517' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_daoVault = '0x7f5E5A443001D85d9f7a13E566fD9E1423B6Eac8' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_fallenSpartans = '0x0Facf7AD25Ce97F174Cd1E7664fD1b8867C3909b' // N/A
export const addr_poolFactory = '0x88B0A87189d140EfD460D5A1b9b8Cbc77F2910E5' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_reserve = '0xf5aB990cdC7B69717AA378A76eB8538F71318478' // 1d882f10adf42b4e2696ff9868b0e27226d5f370 ???
export const addr_router = '0x20e41Cc498CF27efD62EBFAD9B633Ad7a45bDC48' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_synthFactory = '0x16e6c2ba0A0d90203Cc592Ff1E6776f3dd0C6e4f' // 56c9c1dd3d25f5545cb8194b4095b4a49087c460
export const addr_synthVault = '0x30cDEA06826836145c9203b1D4d54e321Cc32B1f' // 9170b11ac4ce8b424f44aa5d503bdb7b0e85b4be
export const addr_utils = '0x1C7437c145bD0bb7EE0dcFD30434173893596ee1' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771

export let stableCoins: string[] = [
  "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", // BUSD TESTNET
  "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867", // DAI TESTNET
]

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)