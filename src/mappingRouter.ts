import { Dividend } from "../generated/Router/Router";
import { Pool, PoolFactory } from "../generated/schema";
import { addr_poolFactory, ZERO_BD } from "./const";
import {
  backfillPoolMetrics,
  updateDayMetrics,
  updateSpartaPrice,
  updateTVL,
} from "./utils";

export function handleDividend(event: Dividend): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let poolAddress = event.params.Pool.toHexString();
  let pool = Pool.load(poolAddress);
  if (poolFactory && pool) {
    backfillPoolMetrics(event.block.timestamp, pool.id); // Call backfillPoolMetrics() prior to updating pool

    let inputBase = event.params.amount.toBigDecimal();
    // CALC AND APPLY feeBURN HERE BEFORE UPDATING POOL BASEAMOUNT ETC
    let derivedSparta = inputBase; // MINUS FEEBURN (TO DO) ************************
    let derivedUSD = inputBase.times(poolFactory.spartaDerivedUSD);
    pool.baseAmount = pool.baseAmount.plus(derivedSparta);
    pool.incentives = pool.incentives.plus(derivedSparta);
    pool.incentivesUSD = pool.incentivesUSD.plus(derivedUSD);
    pool.save(); // Save pool before updating pricing so that even the initial liqAdd gives a valid value
    updateSpartaPrice();
    updateTVL(pool.id);
    updateDayMetrics(
      event.block.timestamp,
      pool.id,
      ZERO_BD,
      ZERO_BD,
      ZERO_BD,
      ZERO_BD,
      derivedSparta,
      derivedUSD,
      ZERO_BD,
      ZERO_BD,
      ZERO_BD,
      true,
      ""
    );
  }
}
