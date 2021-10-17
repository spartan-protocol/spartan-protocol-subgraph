import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { CreatePool } from "../generated/PoolFactory/PoolFactory";
import { PoolFactory, Token, Pool } from "../generated/schema";
import { Pool as PoolTemplate } from "../generated/templates";
import {
  addr_bnb,
  addr_poolFactory,
  ONE_BI,
  stableCoins,
  ZERO_BD,
  ZERO_BI,
} from "./const";
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "./utils";

export function handleCreatePool(event: CreatePool): void {
  // Load/create poolFactory
  let poolFactory = PoolFactory.load(addr_poolFactory);
  if (!poolFactory) {
    poolFactory = new PoolFactory(addr_poolFactory);
    poolFactory.poolCount = ZERO_BI;
    poolFactory.tokenCount = ZERO_BI;
    poolFactory.spartaDerivedUSD = BigDecimal.fromString("600000000000000000");
    poolFactory.tvlSPARTA = ZERO_BD;
    poolFactory.tvlUSD = ZERO_BD;
  }
  // Load/create token
  let token = Token.load(event.params.token.toHexString());
  if (!token) {
    token = new Token(event.params.token.toHexString());
    if (event.params.token == Address.fromString(addr_bnb)) {
      token.symbol = "BNB";
      token.name = "Binance Coin";
      token.decimals = BigInt.fromI32(18);
    } else {
      token.symbol = fetchTokenSymbol(event.params.token);
      token.name = fetchTokenName(event.params.token);
      token.decimals = fetchTokenDecimals(event.params.token);
    }
    token.pool = event.params.pool.toHexString();
    poolFactory.tokenCount = poolFactory.tokenCount.plus(ONE_BI);
  }
  // Load/create Pool
  let pool = Pool.load(event.params.pool.toHexString());
  if (!pool) {
    pool = new Pool(event.params.pool.toHexString());
    pool.token0 = token.id;
    pool.genesis = event.block.timestamp;
    pool.symbol = token.symbol + "-SPP";
    pool.name = token.name + "-SpartanProtocolPool";
    pool.decimals = BigInt.fromI32(18);
    pool.totalSupply = ZERO_BD;
    pool.baseAmount = ZERO_BD;
    pool.tokenAmount = ZERO_BD;
    // pool.curated = false;
    pool.fees = ZERO_BD;
    pool.feesUSD = ZERO_BD;
    pool.stablecoin = stableCoins.includes(token.id);
    pool.tvlSPARTA = ZERO_BD;
    pool.tvlUSD = ZERO_BD;
    poolFactory.poolCount = poolFactory.poolCount.plus(ONE_BI);
  }

  poolFactory.save();
  token.save();
  pool.save();
  // Use template to create contract
  PoolTemplate.create(event.params.pool);
}
