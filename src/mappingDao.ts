import { Address } from "@graphprotocol/graph-ts";
import { DepositAsset, Harvest } from "../generated/Dao/Dao";
import {
  PoolFactory,
  Harvest as HarvestSchem,
  Member,
  Pool,
  Bond,
  Position,
} from "../generated/schema";
import { addr_poolFactory, ZERO_BD } from "./const";
import {
  checkMember,
  checkPosition,
  getDerivedSparta,
  loadTransaction,
  sync,
  updateSpartaPrice,
  updateTVL,
} from "./utils";

export function handleHarvest(event: Harvest): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let owner = event.params.owner.toHexString();
  let harvested = event.params.amount.toBigDecimal();
  let derivedUSD = harvested.times(poolFactory.spartaDerivedUSD);

  let transaction = loadTransaction(event);
  let harvest = new HarvestSchem(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  harvest.transaction = transaction.id;
  harvest.logIndex = event.logIndex;
  harvest.timestamp = transaction.timestamp;
  checkMember(owner);
  harvest.member = owner;
  harvest.origin = event.transaction.from;
  harvest.derivedSparta = harvested;
  harvest.derivedUSD = derivedUSD;
  harvest.save();

  let member = Member.load(owner);
  member.netHarvestSparta = member.netHarvestSparta.plus(harvested);
  member.netHarvestUsd = member.netHarvestUsd.plus(derivedUSD);
  member.save();
}

export function handleBond(event: DepositAsset): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);

  let inputToken = event.params.depositAmount.toBigDecimal();
  let unitsIssued = event.params.bondedLP.toBigDecimal(); // To keep total supply synced
  let poolAddress = event.params.poolAddress.toHexString();
  let owner = event.params.owner.toHexString();

  let pool = Pool.load(poolAddress);
  let derivedSparta = getDerivedSparta(ZERO_BD, inputToken, pool.id);
  let derivedUsd = derivedSparta.times(poolFactory.spartaDerivedUSD);

  // pool.tokenAmount = pool.tokenAmount.plus(inputToken); // Emits normal addLiq event dont need this
  // pool.totalSupply = pool.totalSupply.plus(unitsIssued); // Emits normal addLiq event dont need this
  // pool.save(); // Emits normal addLiq event dont need this
  // sync(Address.fromString(poolAddress)); // Have to sync here as we dont track SPARTA amount going in  // Emits normal addLiq event dont need this

  let transaction = loadTransaction(event);
  let bond = new Bond(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  bond.transaction = transaction.id;
  bond.logIndex = event.logIndex;
  bond.timestamp = transaction.timestamp;
  bond.pool = pool.id;
  bond.token = pool.token0;
  bond.origin = event.transaction.from;
  bond.inputToken = inputToken;
  bond.unitsIssued = unitsIssued;
  bond.derivedUSD = derivedUsd;

  checkMember(owner);
  bond.member = owner;
  bond.save();
  let member = Member.load(owner);
  member.netAddUsd = member.netAddUsd.plus(derivedUsd);
  member.netAddSparta = member.netAddSparta.plus(derivedSparta);
  member.save();

  let positionId = owner + "#" + poolAddress;
  checkPosition(owner, poolAddress);
  let position = Position.load(positionId);
  position.netAddToken = position.netAddToken.plus(inputToken);
  position.netAddUsd = position.netAddUsd.plus(derivedUsd);
  position.netLiqUnits = position.netLiqUnits.plus(unitsIssued);
  position.save();

  updateSpartaPrice();
  updateTVL(pool.id);
}
