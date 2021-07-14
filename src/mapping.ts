import { BigInt } from "@graphprotocol/graph-ts";
import {
  AddCuratePool,
  CreatePool,
  RemoveCuratePool,
} from "../generated/PoolFactory/PoolFactory";
import { PoolFactory, Token, Pool } from "../generated/schema";
import { addr_poolFactory, stableCoins, ZERO_BI } from "./const";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchTokenTotalSupply,
} from "./utils";

export function handleAddCuratePool(event: AddCuratePool): void {}

export function handleCreatePool(event: CreatePool): void {
  // Load/create poolFactory
  let poolFactory = PoolFactory.load(addr_poolFactory);
  if (!poolFactory) {
    poolFactory = new PoolFactory(addr_poolFactory);
    poolFactory.curatedPoolSize = ZERO_BI;
    poolFactory.poolCount = ZERO_BI;
    poolFactory.tokenCount = ZERO_BI;
    poolFactory.curatedCount = ZERO_BI;
  }
  // Load/create token
  let token = Token.load(event.params.token.toHexString());
  if (!token) {
    token = new Token(event.params.token.toHexString());
    token.symbol = fetchTokenSymbol(event.params.token);
    token.name = fetchTokenName(event.params.token);
    token.decimals = fetchTokenDecimals(event.params.token);
    token.totalSupply = fetchTokenTotalSupply(event.params.token);
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
    pool.totalSupply = ZERO_BI;
    pool.baseAmount = ZERO_BI;
    pool.tokenAmount = ZERO_BI;
    pool.curated = false;
    pool.fees = ZERO_BI;
    pool.stablecoin = stableCoins.includes(token.id);
  }
}

export function handleRemoveCuratePool(event: RemoveCuratePool): void {}
