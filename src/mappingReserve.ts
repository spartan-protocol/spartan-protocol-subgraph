import { RealisePOL } from "../generated/Reserve2/Reserve";
import { Pool, PoolFactory } from "../generated/schema";
import { addr_poolFactory, ZERO_BD } from "./const";
import { getDerivedSparta, updateSpartaPrice, updateTVL } from "./utils";

export function handleRealisePOL(event: RealisePOL): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  // let poolAddress = event.params.pool.toHexString();
  // let pool = Pool.load(poolAddress);
  // let inputToken = event.params.amount.toBigDecimal();
  // let derivedSparta = getDerivedSparta(ZERO_BD, inputToken, poolAddress);
  // let derivedUSD = derivedSparta.times(poolFactory.spartaDerivedUSD);
  // pool.tokenAmount = pool.tokenAmount.plus(inputToken);
  // pool.incentives = pool.incentives.plus(derivedSparta);
  // pool.incentivesUSD = pool.incentivesUSD.plus(derivedUSD);
  // pool.save(); // Save pool before updating pricing so that even the initial liqAdd gives a valid value
  // updateSpartaPrice();
  // updateTVL(pool.id);
}
