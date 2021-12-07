import { Pool as PoolGen } from "../generated/PoolFactory/Pool";
import { iBEP20 } from "../generated/PoolFactory/iBEP20";
import { iBEP20SymbolBytes } from "../generated/PoolFactory/iBEP20SymbolBytes";
import { iBEP20NameBytes } from "../generated/PoolFactory/iBEP20NameBytes";
import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  PoolFactory,
  Transaction,
  Pool,
  Token,
  Member,
  MetricsGlobalDay,
  MetricsPoolDay,
  Position,
} from "../generated/schema";
import {
  addr_poolFactory,
  ONE_BD,
  ONE_BI,
  stableCoins,
  ZERO_BD,
  ZERO_BI,
} from "./const";

export function fetchTokenAddr(poolAddress: Address): Address {
  let contract = PoolGen.bind(poolAddress);
  let l1Value = Address.fromString("unknown");
  let l1Result = contract.try_TOKEN();
  if (!l1Result.reverted) {
    l1Value = l1Result.value;
  }
  return l1Value;
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = iBEP20.bind(tokenAddress);
  let contractSymbolBytes = iBEP20SymbolBytes.bind(tokenAddress);

  // try types string and bytes32 for symbol
  let symbolValue = "unknown";
  let symbolResult = contract.try_symbol();
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol();
    if (!symbolResultBytes.reverted) {
      // for broken tokens that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString();
      }
    }
  } else {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = iBEP20.bind(tokenAddress);
  let contractNameBytes = iBEP20NameBytes.bind(tokenAddress);

  // try types string and bytes32 for name
  let nameValue = "unknown";
  let nameResult = contract.try_name();
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name();
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString();
      }
    }
  } else {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = iBEP20.bind(tokenAddress);
  let totalSupplyValue = null;
  let totalSupplyResult = contract.try_totalSupply();
  if (!totalSupplyResult.reverted) {
    totalSupplyValue = totalSupplyResult as i32;
  }
  return BigInt.fromI32(totalSupplyValue as i32);
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = iBEP20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = null;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }

  return BigInt.fromI32(decimalValue as i32);
}

export function isNullEthValue(value: string): boolean {
  return (
    value ==
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );
}

export function loadTransaction(event: ethereum.Event): Transaction {
  let transaction = Transaction.load(event.transaction.hash.toHexString());
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString());
  }
  transaction.blockNumber = event.block.number;
  transaction.timestamp = event.block.timestamp;
  transaction.gasUsed = event.transaction.gasUsed;
  transaction.gasPrice = event.transaction.gasPrice;
  transaction.save();
  return transaction as Transaction;
}

export function getPoolAddr(tokenAddress: string): string {
  let poolAddress = "unknown";
  let token = Token.load(tokenAddress.toString());
  if (token) {
    poolAddress = token.pool;
  }
  return poolAddress;
}

// CHANGE THIS TO USE THE DEEPEST STABLECOIN POOL???
export function updateSpartaPrice(): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let spartaPrice = ZERO_BD;
  let avgCount = ZERO_BI;
  let length = stableCoins.length;
  for (let i = 0; i < length; i++) {
    let pool = Pool.load(getPoolAddr(stableCoins[i]));
    if (pool) {
      if (
        pool.baseAmount.gt(BigDecimal.fromString("100000000000000000000000"))
      ) {
        spartaPrice = pool.tokenAmount.div(pool.baseAmount).plus(spartaPrice);
        avgCount = avgCount.plus(BigInt.fromI32(1));
      }
    }
  }
  if (avgCount.gt(ZERO_BI)) {
    spartaPrice = spartaPrice.div(BigDecimal.fromString(avgCount.toString()));
    poolFactory.spartaDerivedUSD = spartaPrice;
    poolFactory.save();
  }
}

export function updateTVL(poolAddr: string): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let pool = Pool.load(poolAddr);
  poolFactory.tvlSPARTA = poolFactory.tvlSPARTA.minus(pool.tvlSPARTA);
  poolFactory.tvlUSD = poolFactory.tvlUSD.minus(pool.tvlUSD);
  let derivedSparta = pool.baseAmount.times(BigDecimal.fromString("2"));
  let derivedUSD = derivedSparta.times(poolFactory.spartaDerivedUSD);
  pool.tvlSPARTA = derivedSparta;
  pool.tvlUSD = derivedUSD;
  poolFactory.tvlSPARTA = poolFactory.tvlSPARTA.plus(derivedSparta);
  poolFactory.tvlUSD = poolFactory.tvlUSD.plus(derivedUSD);
  pool.save();
  poolFactory.save();
}

export function updateDayMetrics(
  timestamp: BigInt,
  poolAddr: string,
  volSPARTA: BigDecimal,
  volUSD: BigDecimal,
  fees: BigDecimal,
  feesUSD: BigDecimal,
  incentives: BigDecimal,
  incentivesUSD: BigDecimal,
  synthVaultHarvest: BigDecimal,
  daoVaultHarvest: BigDecimal
): void {
  let dayStart = timestamp.mod(BigInt.fromString("86400"));
  dayStart = timestamp.minus(dayStart);
  checkMetricsDay(dayStart, poolAddr);
  let global = MetricsGlobalDay.load(dayStart.toString());

  global.volSPARTA = global.volSPARTA.plus(volSPARTA);
  global.volUSD = global.volUSD.plus(volUSD);
  global.fees = global.fees.plus(fees);
  global.feesUSD = global.feesUSD.plus(feesUSD);
  global.txCount = global.txCount.plus(ONE_BI);
  global.synthVaultHarvest = global.synthVaultHarvest.plus(synthVaultHarvest);
  global.daoVaultHarvest = global.daoVaultHarvest.plus(daoVaultHarvest);
  global.synthVault30Day = global.synthVault30Day.plus(synthVaultHarvest);
  global.daoVault30Day = global.daoVault30Day.plus(daoVaultHarvest);

  if (poolAddr) {
    let poolid = poolAddr + "#" + dayStart.toString();
    let metricPool = MetricsPoolDay.load(poolid);
    metricPool.volSPARTA = metricPool.volSPARTA.plus(volSPARTA);
    metricPool.volUSD = metricPool.volUSD.plus(volUSD);
    metricPool.fees = metricPool.fees.plus(fees);
    metricPool.feesUSD = metricPool.feesUSD.plus(feesUSD);
    metricPool.incentives = metricPool.incentives.plus(incentives);
    metricPool.incentivesUSD = metricPool.incentivesUSD.plus(incentivesUSD);
    metricPool.incentives30Day = metricPool.incentives30Day.plus(incentives);
    metricPool.txCount = metricPool.txCount.plus(ONE_BI);
    metricPool.save();
  }

  global.save();
}

export function checkMetricsDay(dayStart: BigInt, poolAddr: string): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let global = MetricsGlobalDay.load(dayStart.toString());
  if (!global) {
    let day = BigInt.fromString("86400");
    let prevGlobalId = dayStart.minus(day).toString();
    let metricGlobalPrev = MetricsGlobalDay.load(prevGlobalId);
    let prevSynthVault = ZERO_BD;
    let prevDaoVault = ZERO_BD;
    if (metricGlobalPrev) {
      prevSynthVault = metricGlobalPrev.synthVault30Day;
      prevDaoVault = metricGlobalPrev.daoVault30Day;
      let month = BigInt.fromString("30");
      let monthGlobalId = dayStart.minus(day.times(month)).toString();
      let metricGlobalMonth = MetricsGlobalDay.load(monthGlobalId);
      if (metricGlobalMonth) {
        prevSynthVault = prevSynthVault.minus(
          metricGlobalMonth.synthVaultHarvest
        );
        prevDaoVault = prevDaoVault.minus(metricGlobalMonth.daoVaultHarvest);
      }
    }
    global = new MetricsGlobalDay(dayStart.toString());
    global.timestamp = dayStart;
    global.volSPARTA = ZERO_BD;
    global.volUSD = ZERO_BD;
    global.fees = ZERO_BD;
    global.feesUSD = ZERO_BD;
    global.txCount = ZERO_BI;
    global.tvlSPARTA = poolFactory.tvlSPARTA;
    global.tvlUSD = poolFactory.tvlUSD;
    global.synthVaultHarvest = ZERO_BD;
    global.daoVaultHarvest = ZERO_BD;
    global.save();
  }

  if (poolAddr) {
    let poolObj = Pool.load(poolAddr);
    let poolid = poolAddr + "#" + dayStart.toString();
    let metricPool = MetricsPoolDay.load(poolid);
    if (!metricPool) {
      let day = BigInt.fromString("86400");
      let prevPoolId = poolAddr + "#" + dayStart.minus(day).toString();
      let metricPoolPrev = MetricsPoolDay.load(prevPoolId);
      let prevIncentives = ZERO_BD;
      if (metricPoolPrev) {
        prevIncentives = metricPoolPrev.incentives30Day;
        let month = BigInt.fromString("30");
        let monthPoolId =
          poolAddr + "#" + dayStart.minus(day.times(month)).toString();
        let metricPoolMonth = MetricsPoolDay.load(monthPoolId);
        if (metricPoolMonth) {
          prevIncentives = prevIncentives.minus(metricPoolMonth.incentives);
        }
      }
      metricPool = new MetricsPoolDay(poolid);
      metricPool.timestamp = dayStart;
      metricPool.pool = poolAddr;
      metricPool.volSPARTA = ZERO_BD;
      metricPool.volUSD = ZERO_BD;
      metricPool.fees = ZERO_BD;
      metricPool.feesUSD = ZERO_BD;
      metricPool.incentives = ZERO_BD;
      metricPool.incentivesUSD = ZERO_BD;
      metricPool.incentives30Day = prevIncentives;
      metricPool.txCount = ZERO_BI;
      metricPool.tvlSPARTA = poolObj.tvlSPARTA;
      metricPool.tvlUSD = poolObj.tvlUSD;
      metricPool.tokenPrice = getDerivedSparta(ZERO_BD, ONE_BD, poolAddr).times(
        poolFactory.spartaDerivedUSD
      );
      metricPool.save();
      sync(Address.fromString(poolAddr));
    }
  }
}

export function getDerivedSparta(
  spartaInput: BigDecimal,
  tokenInput: BigDecimal,
  poolAddress: string
): BigDecimal {
  let pool = Pool.load(poolAddress);
  let tokenRate = pool.baseAmount.div(pool.tokenAmount);
  let derivedSparta = spartaInput.plus(tokenInput.times(tokenRate));
  return derivedSparta;
}

export function checkMember(memberAddr: string): void {
  let member = Member.load(memberAddr);
  if (!member) {
    member = new Member(memberAddr);
    member.fees = ZERO_BD;
    member.netAddSparta = ZERO_BD;
    member.netRemSparta = ZERO_BD;
    member.netAddUsd = ZERO_BD;
    member.netRemUsd = ZERO_BD;
    member.netHarvestSparta = ZERO_BD;
    member.netHarvestUsd = ZERO_BD;
    member.save();
  }
}

export function checkPosition(memberAddr: string, poolAddr: string): void {
  let positionId = memberAddr + "#" + poolAddr;
  let position = Position.load(positionId);
  if (!position) {
    position = new Position(positionId);
    position.member = memberAddr;
    position.pool = poolAddr;
    position.netAddSparta = ZERO_BD;
    position.netRemSparta = ZERO_BD;
    position.netAddToken = ZERO_BD;
    position.netRemToken = ZERO_BD;
    position.netAddUsd = ZERO_BD;
    position.netRemUsd = ZERO_BD;
    position.netLiqUnits = ZERO_BD;
    position.save();
  }
}

export function sync(poolAddr: Address): void {
  let pool = Pool.load(poolAddr.toHexString());
  let contract = PoolGen.bind(poolAddr);
  let baseAmount = contract.baseAmount();
  if (baseAmount.gt(ZERO_BI)) {
    pool.baseAmount = BigDecimal.fromString(baseAmount.toString());
  }
  pool.save();
}

export function syncBoth(poolAddr: Address): void {
  let pool = Pool.load(poolAddr.toHexString());
  let contract = PoolGen.bind(poolAddr);
  let baseAmount = contract.baseAmount();
  if (baseAmount.gt(ZERO_BI)) {
    pool.baseAmount = BigDecimal.fromString(baseAmount.toString());
  }
  let tokenAmount = contract.tokenAmount();
  if (tokenAmount.gt(ZERO_BI)) {
    pool.tokenAmount = BigDecimal.fromString(tokenAmount.toString());
  }
  pool.save();
}
