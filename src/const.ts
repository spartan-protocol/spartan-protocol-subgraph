import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";

// USE LOWERCASE ADDRESSES FOR STRINGS PLS

// Token addresses
export const addr_bnb = "0x0000000000000000000000000000000000000000";
export const addr_wbnb = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
export const addr_spartav1 = "0xe4ae305ebe1abe663f261bc00534067c80ad677c";
export const addr_spartav2 = "0x3910db0600ea925f63c36ddb1351ab6e2c6eb102";
// Contract addresses
export const addr_bondVault = "0x518f746ab25432146f15f583845cfe3f56d2bb1c"; //
export const addr_dao = "0x80531284f27d8b479aca8dba18fd6303b4bf1567"; //
export const addr_daoVault = "0x4102773565d82c8b0785f1262cfe75f04f170777"; //
export const addr_fallenSpartans = "0xfeb0a2a1ae523e4786f6916ff00e037ff82ab1a6"; // n/a
export const addr_poolFactory = "0x2c577706579e08a88bd30df0fd7a5778a707c3ad"; //
export const addr_reserve = "0x5ab5bbe3044e58303a189d3d28f6da31e9217f9f"; //
export const addr_router = "0x03662d8347ac1487e01fce1ca679e8484ef954a3"; //
export const addr_synthFactory = "0x8b2643d95dead636ec3ba5f720809541c3355f4e"; //
export const addr_synthVault = "0xa6c3288c18505d134445cb4fe8499da22002f1e0"; //
export const addr_utils = "0x82b67e7a325def377f62401126cc54eee73719ec"; //

export let preDiviEventCurateds: string[] = [
  // POOLS THAT WERE CURATED FROM MN DEPLOY UP UNTIL THE FIRST HARVEST EVENT (BLOCK: 12093273)
  "0xa0ab4b300e2ccd801178b28e5de0a8f24614b54c", // BUSDp
  "0x972c7278ecfdcf97556f9c53075576a8bc6547ab", // BNBp
  "0xcc80f0f3746b4561dd7e6e7da4b8cda2ffebc15a", // BTCBp
];

export let stableCoins: string[] = [
  // ADD ALL POSSIBLE FUTURE STABLECOINS HERE
  "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // USDC
  "0x55d398326f99059ff775485246999027b3197955", // USDT
  "0xe9e7cea3dedca5984780bafc599bd69add087d56", // BUSD
];

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let BI_18 = BigInt.fromI32(18);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");

export let DIVI_EVENT_TIMESTAMP = BigInt.fromI32(12093273);
export let GENESIS_TIMESTAMP = BigInt.fromI32(1633305600);

export let ONE_HOUR = BigInt.fromI32(3600);
export let ONE_DAY = BigInt.fromI32(86400);
export let TWO_DAY = BigInt.fromI32(172800);
export let ONE_MONTH = BigInt.fromI32(2592000);
export let TWO_MONTH = BigInt.fromI32(5184000);

