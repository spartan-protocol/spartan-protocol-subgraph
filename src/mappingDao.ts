import { Address } from "@graphprotocol/graph-ts";
import { DepositAsset, Harvest } from "../generated/Dao/Dao";
import {
  PoolFactory,
  Harvest as HarvestSchem,
  Member,
  Pool,
  Bond,
} from "../generated/schema";
import { addr_poolFactory, ZERO_BD } from "./const";
import {
  checkMember,
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

  let member = Member.load(owner);
  member.netHarvestSparta = member.netHarvestSparta.minus(harvested);
  member.netHarvestUSD = member.netHarvestUSD.minus(derivedUSD);
  member.netRealisedSparta = member.netRealisedSparta.minus(harvested);
  member.netRealisedUSD = member.netRealisedUSD.minus(derivedUSD);
  harvest.save();
  member.save();
}

export function handleBond(event: DepositAsset): void {
  let inputToken = event.params.depositAmount.toBigDecimal();
  let unitsIssued = event.params.bondedLP.toBigDecimal(); // To keep total supply synced
  let poolAddress = event.params.poolAddress.toHexString();
  let pool = Pool.load(poolAddress);
  pool.tokenAmount = pool.tokenAmount.plus(inputToken);
  pool.totalSupply = pool.totalSupply.plus(unitsIssued);
  pool.save(); // Save pool before updating pricing so that even the initial liqAdd gives a valid value
  sync(Address.fromString(poolAddress)); // Have to sync here as we dont track SPARTA amount going in
  updateSpartaPrice();

  let poolFactory = PoolFactory.load(addr_poolFactory);

  let transaction = loadTransaction(event);
  let bond = new Bond(
    transaction.id.toString() + "#" + event.logIndex.toString()
  );
  bond.transaction = transaction.id;
  bond.logIndex = event.logIndex;
  bond.timestamp = transaction.timestamp;
  bond.pool = pool.id;
  bond.token = pool.token0;
  checkMember(event.params.owner.toHexString());
  bond.member = event.params.owner.toHexString();
  bond.origin = event.transaction.from;
  bond.inputToken = inputToken;
  bond.unitsIssued = unitsIssued;
  bond.derivedSparta = getDerivedSparta(ZERO_BD, inputToken, pool.id);
  bond.derivedUSD = bond.derivedSparta.times(poolFactory.spartaDerivedUSD);

  let member = Member.load(event.params.owner.toHexString());
  member.liqNetSparta = member.liqNetSparta.minus(bond.derivedSparta);
  member.liqNetUSD = member.liqNetUSD.minus(bond.derivedUSD);

  bond.save();
  member.save();
  updateTVL(pool.id);
}
