import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  AddLiquidity,
  RemoveLiquidity,
  Swapped,
  MintSynth,
  BurnSynth,
} from "../generated/PoolFactory/Pool";
import { PoolFactory, Pool, LiqAdd } from "../generated/schema";
import {
  addr_poolFactory,
  stableCoins,
  ZERO_BD,
} from "./const";
import {
  fetchPoolL1,
  fetchTokenName,
  fetchTokenSymbol,
  loadTransaction,
} from "./utils";

export function handleAddLiquidity(event: AddLiquidity): void {
  // MAKE SURE TO LOAD AND CHECK POOL BEFORE LIQUIDITY ADD
  // IF POOL DOESNT EXIST; HAND TOKEN AND POOL ADDRESSES TO handleCreatePool()
  // This is due to the fact that liquidity is added to a pool before the createPool event is emitted when using createPoolADD()
  let poolAddress = event.address.toHexString();
  let pool = Pool.load(poolAddress);
  let poolFactory = PoolFactory.load(addr_poolFactory);
  // Create Pool if non-existent
  if (!pool) {
    let tokenAddr = fetchPoolL1(event.address);
    pool = new Pool(poolAddress);
    pool.token0 = tokenAddr.toHexString();
    pool.genesis = event.block.timestamp;
    pool.symbol = fetchTokenSymbol(tokenAddr) + "-SPP";
    pool.name = fetchTokenName(tokenAddr) + "-SpartanProtocolPool";
    pool.decimals = BigInt.fromI32(18);
    pool.totalSupply = ZERO_BD;
    pool.baseAmount = ZERO_BD;
    pool.tokenAmount = ZERO_BD;
    pool.fees = ZERO_BD;
    pool.stablecoin = stableCoins.includes(tokenAddr.toHexString());
  }

  let inputBase = event.params.inputBase.toBigDecimal();
  let inputToken = event.params.inputToken.toBigDecimal();
  let unitsIssued = event.params.unitsIssued.toBigDecimal();

  pool.baseAmount = pool.baseAmount.plus(inputBase);
  pool.tokenAmount = pool.tokenAmount.plus(inputToken);
  pool.totalSupply = pool.totalSupply.plus(unitsIssued);

  let transaction = loadTransaction(event);
  let liqAdd = new LiqAdd(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  liqAdd.transaction = transaction.id;
  liqAdd.logIndex = event.logIndex;
  liqAdd.timestamp = transaction.timestamp;
  liqAdd.pool = pool.id;
  liqAdd.token = pool.token0;
  liqAdd.member = event.params.member;
  liqAdd.origin = event.transaction.from;
  liqAdd.inputBase = inputBase;
  liqAdd.inputToken = inputToken;
  liqAdd.unitsIssued = unitsIssued;

  liqAdd.save();
  pool.save();
  poolFactory.save();
}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {}

export function handleSwapped(event: Swapped): void {}

export function handleMintSynth(event: MintSynth): void {}

export function handleBurnSynth(event: BurnSynth): void {}
