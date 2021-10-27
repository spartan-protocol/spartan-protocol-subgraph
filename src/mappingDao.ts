import { Harvest } from "../generated/Dao/Dao";
import {
  PoolFactory,
  Harvest as HarvestSchem,
  Member,
} from "../generated/schema";
import { addr_poolFactory } from "./const";
import { checkMember, loadTransaction } from "./utils";

export function handleHarvest(event: Harvest): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  // let owner = event.params.owner.toHexString();
  // let harvested = event.params.amount.toBigDecimal();
  // let derivedUSD = harvested.times(poolFactory.spartaDerivedUSD);

  // let transaction = loadTransaction(event);
  // let harvest = new HarvestSchem(
  //   transaction.id.toString() + "#" + event.logIndex.toString()
  // );
  // harvest.transaction = transaction.id;
  // harvest.logIndex = event.logIndex;
  // harvest.member = owner;
  // harvest.origin = event.transaction.from;
  // harvest.derivedSparta = harvested;
  // harvest.derivedUSD = derivedUSD;

  // let member = Member.load(owner);
  // member.liqNetSparta = member.liqNetSparta.minus(harvested);
  // member.liqNetUSD = member.liqNetUSD.minus(derivedUSD);
  // harvest.save();
  // member.save();
}
