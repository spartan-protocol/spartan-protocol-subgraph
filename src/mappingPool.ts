import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  AddLiquidity,
  RemoveLiquidity,
  Swapped,
  MintSynth,
  BurnSynth,
} from "../generated/PoolFactory/Pool";
import {
  PoolFactory,
  Pool,
  LiqAdd,
  LiqRemove,
  Swap,
  Member,
  Position,
  ForgeSynth,
  MeltSynth,
} from "../generated/schema";
import { addr_poolFactory, preDiviEventCurateds, ZERO_BD } from "./const";
import {
  checkMember,
  checkPosition,
  getDerivedSparta,
  loadTransaction,
  sync,
  updateDayMetrics,
  updateSpartaPrice,
  updateTVL,
} from "./utils";

export function handleAddLiquidity(event: AddLiquidity): void {
  let poolAddress = event.address.toHexString();
  let pool = Pool.load(poolAddress);
  let memberAddr = event.params.member.toHexString();

  let inputBase = event.params.inputBase.toBigDecimal();
  let inputToken = event.params.inputToken.toBigDecimal();
  let unitsIssued = event.params.unitsIssued.toBigDecimal();
  let totalUnitsIssued = unitsIssued;

  let initialAdd =
    pool.baseAmount.equals(ZERO_BD) || pool.tokenAmount.equals(ZERO_BD);
  if (initialAdd) {
    totalUnitsIssued = unitsIssued.div(BigDecimal.fromString("0.99"));
  }
  pool.baseAmount = pool.baseAmount.plus(inputBase);
  pool.tokenAmount = pool.tokenAmount.plus(inputToken);
  pool.totalSupply = pool.totalSupply.plus(totalUnitsIssued);
  if (initialAdd) {
    pool.save(); // Save pool before updating pricing so that even the initial liqAdd gives a valid value
    updateSpartaPrice();
  }

  let poolFactory = PoolFactory.load(addr_poolFactory);
  let derivedSparta = getDerivedSparta(inputBase, inputToken, pool.id);
  let derivedUsd = derivedSparta.times(poolFactory.spartaDerivedUSD);

  let transaction = loadTransaction(event);
  let liqAdd = new LiqAdd(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  liqAdd.transaction = transaction.id;
  liqAdd.logIndex = event.logIndex;
  liqAdd.timestamp = transaction.timestamp;
  liqAdd.pool = pool.id;
  liqAdd.token = pool.token0;
  liqAdd.origin = event.transaction.from;
  liqAdd.inputBase = inputBase;
  liqAdd.inputToken = inputToken;
  liqAdd.unitsIssued = unitsIssued;
  liqAdd.derivedUSD = derivedUsd;

  checkMember(memberAddr);
  liqAdd.member = memberAddr;
  liqAdd.save();
  let member = Member.load(memberAddr);
  member.netAddUsd = member.netAddUsd.plus(derivedUsd);
  member.netAddSparta = member.netAddSparta.plus(derivedSparta);
  member.save();

  let positionId = memberAddr + "#" + poolAddress;
  checkPosition(memberAddr, poolAddress);
  let position = Position.load(positionId);
  position.netAddSparta = position.netAddSparta.plus(inputBase);
  position.netAddToken = position.netAddToken.plus(inputToken);
  position.netAddUsd = position.netAddUsd.plus(derivedUsd);
  position.netLiqUnits = position.netLiqUnits.plus(unitsIssued);
  position.save();

  if (!initialAdd) {
    pool.save(); // Save pool before updating pricing so that even the initial liqAdd gives a valid value
    updateSpartaPrice();
  }
  updateTVL(pool.id);
}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let poolAddress = event.address.toHexString();
  let pool = Pool.load(poolAddress);
  let memberAddr = event.params.member.toHexString();

  let inputUnits = event.params.unitsClaimed.toBigDecimal();
  let outputBase = event.params.outputBase.toBigDecimal();
  let outputToken = event.params.outputToken.toBigDecimal();

  let derivedSparta = getDerivedSparta(outputBase, outputToken, pool.id);
  let derivedUsd = derivedSparta.times(poolFactory.spartaDerivedUSD);

  pool.baseAmount = pool.baseAmount.minus(outputBase);
  pool.tokenAmount = pool.tokenAmount.minus(outputToken);
  pool.totalSupply = pool.totalSupply.minus(inputUnits);
  pool.save();

  let transaction = loadTransaction(event);
  let liqRemove = new LiqRemove(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  liqRemove.transaction = transaction.id;
  liqRemove.logIndex = event.logIndex;
  liqRemove.timestamp = transaction.timestamp;
  liqRemove.pool = pool.id;
  liqRemove.token = pool.token0;
  liqRemove.origin = event.transaction.from;
  liqRemove.inputLPs = inputUnits;
  liqRemove.outputToken = outputToken;
  liqRemove.outputSparta = outputBase;
  liqRemove.derivedUSD = derivedUsd;

  checkMember(memberAddr);
  liqRemove.member = memberAddr;
  liqRemove.save();
  let member = Member.load(memberAddr);
  member.netRemUsd = member.netRemUsd.plus(derivedUsd);
  member.netRemSparta = member.netRemSparta.plus(derivedSparta);
  member.save();

  checkPosition(memberAddr, poolAddress);
  let position = Position.load(memberAddr + "#" + poolAddress);
  position.netRemSparta = position.netRemSparta.plus(outputBase);
  position.netRemToken = position.netRemToken.plus(outputToken);
  position.netRemUsd = position.netRemUsd.plus(derivedUsd);
  position.netLiqUnits = position.netLiqUnits.minus(inputUnits);
  position.save();

  updateSpartaPrice();
  updateTVL(pool.id);
}

export function handleSwapped(event: Swapped): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let poolAddress = event.address.toHexString();
  let pool = Pool.load(poolAddress);

  let input = event.params.inputAmount.toBigDecimal();
  let outputAddr = event.params.tokenTo;
  let output = event.params.outputAmount.toBigDecimal();
  let member = event.params.recipient.toHexString();
  let fee = event.params.fee.toBigDecimal();
  let fromSparta = pool.token0 == outputAddr.toHexString();

  if (fromSparta) {
    pool.baseAmount = pool.baseAmount.plus(input);
    pool.tokenAmount = pool.tokenAmount.minus(output);
  } else {
    pool.tokenAmount = pool.tokenAmount.plus(input);
    pool.baseAmount = pool.baseAmount.minus(output);
  }
  pool.fees = pool.fees.plus(fee);
  pool.feesUSD = pool.feesUSD.plus(fee.times(poolFactory.spartaDerivedUSD));

  let transaction = loadTransaction(event);
  let swap = new Swap(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  swap.transaction = transaction.id;
  swap.logIndex = event.logIndex;
  swap.timestamp = transaction.timestamp;
  swap.pool = pool.id;
  swap.token = pool.token0;
  checkMember(member);
  swap.member = member;
  swap.origin = event.transaction.from;
  swap.fromSparta = fromSparta;
  swap.input = input;
  swap.output = output;
  swap.derivedSparta = getDerivedSparta(
    fromSparta ? input : ZERO_BD,
    fromSparta ? ZERO_BD : input,
    pool.id
  );
  swap.derivedUSD = swap.derivedSparta.times(poolFactory.spartaDerivedUSD);

  let memberLoaded = Member.load(member);
  memberLoaded.fees = memberLoaded.fees.plus(fee);

  pool.save();
  // SYNC BASEAMOUNT IF CURATED (DIVIDEND) && BEFORE THE ROUTER WAS UPGRADED TO INC DIVI EVENT
  if (
    event.block.number.lt(BigInt.fromI32(12093273)) &&
    preDiviEventCurateds.includes(pool.id)
  ) {
    sync(Address.fromString(poolAddress));
  }
  updateSpartaPrice();
  swap.save();
  memberLoaded.save();
  updateTVL(pool.id);
  updateDayMetrics(
    swap.timestamp,
    pool.id,
    swap.derivedSparta,
    swap.derivedUSD,
    fee,
    fee.times(poolFactory.spartaDerivedUSD),
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD
  );
}

export function handleMintSynth(event: MintSynth): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let poolAddress = event.address.toHexString();
  let pool = Pool.load(poolAddress);

  let member = event.params.member.toHexString();
  let inputBase = event.params.baseAmount.toBigDecimal();
  let liqUnits = event.params.liqUnits.toBigDecimal();
  let outputSynth = event.params.synthAmount.toBigDecimal();

  pool.baseAmount = pool.baseAmount.plus(inputBase);
  pool.totalSupply = pool.totalSupply.plus(liqUnits);
  pool.save();

  let transaction = loadTransaction(event);
  let mintSynth = new ForgeSynth(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  mintSynth.transaction = transaction.id;
  mintSynth.logIndex = event.logIndex;
  mintSynth.timestamp = transaction.timestamp;
  mintSynth.pool = pool.id;
  mintSynth.token = pool.token0;
  checkMember(member);
  mintSynth.member = member;
  mintSynth.origin = event.transaction.from;
  mintSynth.inputSparta = inputBase;
  mintSynth.mintedSynths = outputSynth;
  mintSynth.derivedUSD = inputBase.times(poolFactory.spartaDerivedUSD);
  mintSynth.save();

  updateSpartaPrice();
  updateTVL(pool.id);
  updateDayMetrics(
    transaction.timestamp,
    pool.id,
    inputBase,
    inputBase.times(poolFactory.spartaDerivedUSD),
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD
  );
}

export function handleBurnSynth(event: BurnSynth): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let poolAddress = event.address.toHexString();
  let pool = Pool.load(poolAddress);

  let member = event.params.member.toHexString();
  let inputSynth = event.params.synthAmount.toBigDecimal();
  let liqUnits = event.params.liqUnits.toBigDecimal();
  let outputBase = event.params.baseAmount.toBigDecimal();

  pool.totalSupply = pool.totalSupply.minus(liqUnits);
  pool.baseAmount = pool.baseAmount.minus(outputBase);

  let transaction = loadTransaction(event);
  let burnSynth = new MeltSynth(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  burnSynth.transaction = transaction.id;
  burnSynth.logIndex = event.logIndex;
  burnSynth.timestamp = transaction.timestamp;
  burnSynth.pool = pool.id;
  burnSynth.token = pool.token0;
  checkMember(member);
  burnSynth.member = member;
  burnSynth.origin = event.transaction.from;
  burnSynth.outputSparta = outputBase;
  burnSynth.burnedSynths = inputSynth;
  burnSynth.derivedUSD = outputBase.times(poolFactory.spartaDerivedUSD);
  burnSynth.save();

  pool.save();
  updateSpartaPrice();
  updateTVL(pool.id);
  updateDayMetrics(
    transaction.timestamp,
    pool.id,
    outputBase,
    outputBase.times(poolFactory.spartaDerivedUSD),
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD
  );
}
