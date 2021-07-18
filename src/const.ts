import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"

// USE LOWERCASE ADDRESSES FOR STRINGS PLS

// Token addresses
export const addr_bnb = "0x0000000000000000000000000000000000000000"
export const addr_wbnb = "0x27c6487c9b115c184bb04a1cf549b670a22d2870"
export const addr_spartav1 = "0x6e812dd5b642334bbd17636d3865ce82c3d4d7eb"
export const addr_spartav2 = "0xd055adfdd53963f578a929eaa440dbed95407472"
// Contract addresses
export const addr_bondVault = '0x91a0862f8fb5b9b430bf634720114c7173a1d0fc' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_dao = '0x4f45fb8c7cfeafefa4b9159f92396dc19b437517' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_daoVault = '0x7f5e5a443001d85d9f7a13e566fd9e1423b6eac8' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_fallenSpartans = '0x0facf7ad25ce97f174cd1e7664fd1b8867c3909b' // N/A
export const addr_poolFactory = '0x88b0a87189d140efd460d5a1b9b8cbc77f2910e5' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_reserve = '0xf5ab990cdc7b69717aa378a76eb8538f71318478' // 1d882f10adf42b4e2696ff9868b0e27226d5f370 ???
export const addr_router = '0x20e41cc498cf27efd62ebfad9b633ad7a45bdc48' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771
export const addr_synthFactory = '0x16e6c2ba0a0d90203cc592ff1e6776f3dd0c6e4f' // 56c9c1dd3d25f5545cb8194b4095b4a49087c460
export const addr_synthVault = '0x30cdea06826836145c9203b1d4d54e321cc32b1f' // 9170b11ac4ce8b424f44aa5d503bdb7b0e85b4be
export const addr_utils = '0x1c7437c145bd0bb7ee0dcfd30434173893596ee1' // f2bb6131c8ae2c8242c9f72a4d49cdf29bf19771

export let stableCoins: string[] = [
  // ADD ALL POSSIBLE FUTURE STABLECOINS HERE
  "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee", // BUSD TESTNET
  "0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867", // DAI TESTNET
]

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let BI_18 = BigInt.fromI32(18)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')