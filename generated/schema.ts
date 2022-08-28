// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class PoolFactory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolFactory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PoolFactory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PoolFactory", id.toString(), this);
    }
  }

  static load(id: string): PoolFactory | null {
    return changetype<PoolFactory | null>(store.get("PoolFactory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get poolCount(): BigInt {
    let value = this.get("poolCount");
    return value!.toBigInt();
  }

  set poolCount(value: BigInt) {
    this.set("poolCount", Value.fromBigInt(value));
  }

  get tokenCount(): BigInt {
    let value = this.get("tokenCount");
    return value!.toBigInt();
  }

  set tokenCount(value: BigInt) {
    this.set("tokenCount", Value.fromBigInt(value));
  }

  get spartaDerivedUSD(): BigDecimal {
    let value = this.get("spartaDerivedUSD");
    return value!.toBigDecimal();
  }

  set spartaDerivedUSD(value: BigDecimal) {
    this.set("spartaDerivedUSD", Value.fromBigDecimal(value));
  }

  get tvlSPARTA(): BigDecimal {
    let value = this.get("tvlSPARTA");
    return value!.toBigDecimal();
  }

  set tvlSPARTA(value: BigDecimal) {
    this.set("tvlSPARTA", Value.fromBigDecimal(value));
  }

  get tvlUSD(): BigDecimal {
    let value = this.get("tvlUSD");
    return value!.toBigDecimal();
  }

  set tvlUSD(value: BigDecimal) {
    this.set("tvlUSD", Value.fromBigDecimal(value));
  }

  get lpUnits(): BigDecimal {
    let value = this.get("lpUnits");
    return value!.toBigDecimal();
  }

  set lpUnits(value: BigDecimal) {
    this.set("lpUnits", Value.fromBigDecimal(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token0(): string {
    let value = this.get("token0");
    return value!.toString();
  }

  set token0(value: string) {
    this.set("token0", Value.fromString(value));
  }

  get genesis(): BigInt {
    let value = this.get("genesis");
    return value!.toBigInt();
  }

  set genesis(value: BigInt) {
    this.set("genesis", Value.fromBigInt(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get baseAmount(): BigDecimal {
    let value = this.get("baseAmount");
    return value!.toBigDecimal();
  }

  set baseAmount(value: BigDecimal) {
    this.set("baseAmount", Value.fromBigDecimal(value));
  }

  get tokenAmount(): BigDecimal {
    let value = this.get("tokenAmount");
    return value!.toBigDecimal();
  }

  set tokenAmount(value: BigDecimal) {
    this.set("tokenAmount", Value.fromBigDecimal(value));
  }

  get fees(): BigDecimal {
    let value = this.get("fees");
    return value!.toBigDecimal();
  }

  set fees(value: BigDecimal) {
    this.set("fees", Value.fromBigDecimal(value));
  }

  get feesUSD(): BigDecimal {
    let value = this.get("feesUSD");
    return value!.toBigDecimal();
  }

  set feesUSD(value: BigDecimal) {
    this.set("feesUSD", Value.fromBigDecimal(value));
  }

  get incentives(): BigDecimal {
    let value = this.get("incentives");
    return value!.toBigDecimal();
  }

  set incentives(value: BigDecimal) {
    this.set("incentives", Value.fromBigDecimal(value));
  }

  get incentivesUSD(): BigDecimal {
    let value = this.get("incentivesUSD");
    return value!.toBigDecimal();
  }

  set incentivesUSD(value: BigDecimal) {
    this.set("incentivesUSD", Value.fromBigDecimal(value));
  }

  get stablecoin(): boolean {
    let value = this.get("stablecoin");
    return value!.toBoolean();
  }

  set stablecoin(value: boolean) {
    this.set("stablecoin", Value.fromBoolean(value));
  }

  get tvlSPARTA(): BigDecimal {
    let value = this.get("tvlSPARTA");
    return value!.toBigDecimal();
  }

  set tvlSPARTA(value: BigDecimal) {
    this.set("tvlSPARTA", Value.fromBigDecimal(value));
  }

  get tvlUSD(): BigDecimal {
    let value = this.get("tvlUSD");
    return value!.toBigDecimal();
  }

  set tvlUSD(value: BigDecimal) {
    this.set("tvlUSD", Value.fromBigDecimal(value));
  }
}

export class Member extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Member entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Member must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Member", id.toString(), this);
    }
  }

  static load(id: string): Member | null {
    return changetype<Member | null>(store.get("Member", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fees(): BigDecimal {
    let value = this.get("fees");
    return value!.toBigDecimal();
  }

  set fees(value: BigDecimal) {
    this.set("fees", Value.fromBigDecimal(value));
  }

  get netAddSparta(): BigDecimal {
    let value = this.get("netAddSparta");
    return value!.toBigDecimal();
  }

  set netAddSparta(value: BigDecimal) {
    this.set("netAddSparta", Value.fromBigDecimal(value));
  }

  get netRemSparta(): BigDecimal {
    let value = this.get("netRemSparta");
    return value!.toBigDecimal();
  }

  set netRemSparta(value: BigDecimal) {
    this.set("netRemSparta", Value.fromBigDecimal(value));
  }

  get netAddUsd(): BigDecimal {
    let value = this.get("netAddUsd");
    return value!.toBigDecimal();
  }

  set netAddUsd(value: BigDecimal) {
    this.set("netAddUsd", Value.fromBigDecimal(value));
  }

  get netRemUsd(): BigDecimal {
    let value = this.get("netRemUsd");
    return value!.toBigDecimal();
  }

  set netRemUsd(value: BigDecimal) {
    this.set("netRemUsd", Value.fromBigDecimal(value));
  }

  get netHarvestSparta(): BigDecimal {
    let value = this.get("netHarvestSparta");
    return value!.toBigDecimal();
  }

  set netHarvestSparta(value: BigDecimal) {
    this.set("netHarvestSparta", Value.fromBigDecimal(value));
  }

  get netHarvestUsd(): BigDecimal {
    let value = this.get("netHarvestUsd");
    return value!.toBigDecimal();
  }

  set netHarvestUsd(value: BigDecimal) {
    this.set("netHarvestUsd", Value.fromBigDecimal(value));
  }

  get netForgeSparta(): BigDecimal {
    let value = this.get("netForgeSparta");
    return value!.toBigDecimal();
  }

  set netForgeSparta(value: BigDecimal) {
    this.set("netForgeSparta", Value.fromBigDecimal(value));
  }

  get netForgeUsd(): BigDecimal {
    let value = this.get("netForgeUsd");
    return value!.toBigDecimal();
  }

  set netForgeUsd(value: BigDecimal) {
    this.set("netForgeUsd", Value.fromBigDecimal(value));
  }

  get netMeltSparta(): BigDecimal {
    let value = this.get("netMeltSparta");
    return value!.toBigDecimal();
  }

  set netMeltSparta(value: BigDecimal) {
    this.set("netMeltSparta", Value.fromBigDecimal(value));
  }

  get netMeltUsd(): BigDecimal {
    let value = this.get("netMeltUsd");
    return value!.toBigDecimal();
  }

  set netMeltUsd(value: BigDecimal) {
    this.set("netMeltUsd", Value.fromBigDecimal(value));
  }

  get netSynthHarvestSparta(): BigDecimal {
    let value = this.get("netSynthHarvestSparta");
    return value!.toBigDecimal();
  }

  set netSynthHarvestSparta(value: BigDecimal) {
    this.set("netSynthHarvestSparta", Value.fromBigDecimal(value));
  }

  get netSynthHarvestUsd(): BigDecimal {
    let value = this.get("netSynthHarvestUsd");
    return value!.toBigDecimal();
  }

  set netSynthHarvestUsd(value: BigDecimal) {
    this.set("netSynthHarvestUsd", Value.fromBigDecimal(value));
  }

  get positions(): Array<string> {
    let value = this.get("positions");
    return value!.toStringArray();
  }

  set positions(value: Array<string>) {
    this.set("positions", Value.fromStringArray(value));
  }

  get synthPositions(): Array<string> {
    let value = this.get("synthPositions");
    return value!.toStringArray();
  }

  set synthPositions(value: Array<string>) {
    this.set("synthPositions", Value.fromStringArray(value));
  }
}

export class Position extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Position entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Position must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Position", id.toString(), this);
    }
  }

  static load(id: string): Position | null {
    return changetype<Position | null>(store.get("Position", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get member(): string {
    let value = this.get("member");
    return value!.toString();
  }

  set member(value: string) {
    this.set("member", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get netAddSparta(): BigDecimal {
    let value = this.get("netAddSparta");
    return value!.toBigDecimal();
  }

  set netAddSparta(value: BigDecimal) {
    this.set("netAddSparta", Value.fromBigDecimal(value));
  }

  get netRemSparta(): BigDecimal {
    let value = this.get("netRemSparta");
    return value!.toBigDecimal();
  }

  set netRemSparta(value: BigDecimal) {
    this.set("netRemSparta", Value.fromBigDecimal(value));
  }

  get netAddToken(): BigDecimal {
    let value = this.get("netAddToken");
    return value!.toBigDecimal();
  }

  set netAddToken(value: BigDecimal) {
    this.set("netAddToken", Value.fromBigDecimal(value));
  }

  get netRemToken(): BigDecimal {
    let value = this.get("netRemToken");
    return value!.toBigDecimal();
  }

  set netRemToken(value: BigDecimal) {
    this.set("netRemToken", Value.fromBigDecimal(value));
  }

  get netAddUsd(): BigDecimal {
    let value = this.get("netAddUsd");
    return value!.toBigDecimal();
  }

  set netAddUsd(value: BigDecimal) {
    this.set("netAddUsd", Value.fromBigDecimal(value));
  }

  get netRemUsd(): BigDecimal {
    let value = this.get("netRemUsd");
    return value!.toBigDecimal();
  }

  set netRemUsd(value: BigDecimal) {
    this.set("netRemUsd", Value.fromBigDecimal(value));
  }

  get netLiqUnits(): BigDecimal {
    let value = this.get("netLiqUnits");
    return value!.toBigDecimal();
  }

  set netLiqUnits(value: BigDecimal) {
    this.set("netLiqUnits", Value.fromBigDecimal(value));
  }
}

export class SynthPosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SynthPosition entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SynthPosition must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SynthPosition", id.toString(), this);
    }
  }

  static load(id: string): SynthPosition | null {
    return changetype<SynthPosition | null>(store.get("SynthPosition", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get member(): string {
    let value = this.get("member");
    return value!.toString();
  }

  set member(value: string) {
    this.set("member", Value.fromString(value));
  }

  get netForgeSparta(): BigDecimal {
    let value = this.get("netForgeSparta");
    return value!.toBigDecimal();
  }

  set netForgeSparta(value: BigDecimal) {
    this.set("netForgeSparta", Value.fromBigDecimal(value));
  }

  get netForgeUsd(): BigDecimal {
    let value = this.get("netForgeUsd");
    return value!.toBigDecimal();
  }

  set netForgeUsd(value: BigDecimal) {
    this.set("netForgeUsd", Value.fromBigDecimal(value));
  }

  get netMeltSparta(): BigDecimal {
    let value = this.get("netMeltSparta");
    return value!.toBigDecimal();
  }

  set netMeltSparta(value: BigDecimal) {
    this.set("netMeltSparta", Value.fromBigDecimal(value));
  }

  get netMeltUsd(): BigDecimal {
    let value = this.get("netMeltUsd");
    return value!.toBigDecimal();
  }

  set netMeltUsd(value: BigDecimal) {
    this.set("netMeltUsd", Value.fromBigDecimal(value));
  }

  get netSynthHarvestSparta(): BigDecimal {
    let value = this.get("netSynthHarvestSparta");
    return value!.toBigDecimal();
  }

  set netSynthHarvestSparta(value: BigDecimal) {
    this.set("netSynthHarvestSparta", Value.fromBigDecimal(value));
  }

  get netSynthHarvestUsd(): BigDecimal {
    let value = this.get("netSynthHarvestUsd");
    return value!.toBigDecimal();
  }

  set netSynthHarvestUsd(value: BigDecimal) {
    this.set("netSynthHarvestUsd", Value.fromBigDecimal(value));
  }
}

export class MetricsGlobalDay extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MetricsGlobalDay entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MetricsGlobalDay must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MetricsGlobalDay", id.toString(), this);
    }
  }

  static load(id: string): MetricsGlobalDay | null {
    return changetype<MetricsGlobalDay | null>(
      store.get("MetricsGlobalDay", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get volSPARTA(): BigDecimal {
    let value = this.get("volSPARTA");
    return value!.toBigDecimal();
  }

  set volSPARTA(value: BigDecimal) {
    this.set("volSPARTA", Value.fromBigDecimal(value));
  }

  get volUSD(): BigDecimal {
    let value = this.get("volUSD");
    return value!.toBigDecimal();
  }

  set volUSD(value: BigDecimal) {
    this.set("volUSD", Value.fromBigDecimal(value));
  }

  get fees(): BigDecimal {
    let value = this.get("fees");
    return value!.toBigDecimal();
  }

  set fees(value: BigDecimal) {
    this.set("fees", Value.fromBigDecimal(value));
  }

  get feesUSD(): BigDecimal {
    let value = this.get("feesUSD");
    return value!.toBigDecimal();
  }

  set feesUSD(value: BigDecimal) {
    this.set("feesUSD", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }

  get tvlSPARTA(): BigDecimal {
    let value = this.get("tvlSPARTA");
    return value!.toBigDecimal();
  }

  set tvlSPARTA(value: BigDecimal) {
    this.set("tvlSPARTA", Value.fromBigDecimal(value));
  }

  get tvlUSD(): BigDecimal {
    let value = this.get("tvlUSD");
    return value!.toBigDecimal();
  }

  set tvlUSD(value: BigDecimal) {
    this.set("tvlUSD", Value.fromBigDecimal(value));
  }

  get synthVaultHarvest(): BigDecimal {
    let value = this.get("synthVaultHarvest");
    return value!.toBigDecimal();
  }

  set synthVaultHarvest(value: BigDecimal) {
    this.set("synthVaultHarvest", Value.fromBigDecimal(value));
  }

  get daoVaultHarvest(): BigDecimal {
    let value = this.get("daoVaultHarvest");
    return value!.toBigDecimal();
  }

  set daoVaultHarvest(value: BigDecimal) {
    this.set("daoVaultHarvest", Value.fromBigDecimal(value));
  }

  get synthVault30Day(): BigDecimal {
    let value = this.get("synthVault30Day");
    return value!.toBigDecimal();
  }

  set synthVault30Day(value: BigDecimal) {
    this.set("synthVault30Day", Value.fromBigDecimal(value));
  }

  get daoVault30Day(): BigDecimal {
    let value = this.get("daoVault30Day");
    return value!.toBigDecimal();
  }

  set daoVault30Day(value: BigDecimal) {
    this.set("daoVault30Day", Value.fromBigDecimal(value));
  }

  get lpUnits(): BigDecimal {
    let value = this.get("lpUnits");
    return value!.toBigDecimal();
  }

  set lpUnits(value: BigDecimal) {
    this.set("lpUnits", Value.fromBigDecimal(value));
  }
}

export class MetricsPoolDay extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MetricsPoolDay entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MetricsPoolDay must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MetricsPoolDay", id.toString(), this);
    }
  }

  static load(id: string): MetricsPoolDay | null {
    return changetype<MetricsPoolDay | null>(store.get("MetricsPoolDay", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get volSPARTA(): BigDecimal {
    let value = this.get("volSPARTA");
    return value!.toBigDecimal();
  }

  set volSPARTA(value: BigDecimal) {
    this.set("volSPARTA", Value.fromBigDecimal(value));
  }

  get volTOKEN(): BigDecimal {
    let value = this.get("volTOKEN");
    return value!.toBigDecimal();
  }

  set volTOKEN(value: BigDecimal) {
    this.set("volTOKEN", Value.fromBigDecimal(value));
  }

  get volUSD(): BigDecimal {
    let value = this.get("volUSD");
    return value!.toBigDecimal();
  }

  set volUSD(value: BigDecimal) {
    this.set("volUSD", Value.fromBigDecimal(value));
  }

  get volRollingSPARTA(): BigDecimal {
    let value = this.get("volRollingSPARTA");
    return value!.toBigDecimal();
  }

  set volRollingSPARTA(value: BigDecimal) {
    this.set("volRollingSPARTA", Value.fromBigDecimal(value));
  }

  get volRollingTOKEN(): BigDecimal {
    let value = this.get("volRollingTOKEN");
    return value!.toBigDecimal();
  }

  set volRollingTOKEN(value: BigDecimal) {
    this.set("volRollingTOKEN", Value.fromBigDecimal(value));
  }

  get volRollingUSD(): BigDecimal {
    let value = this.get("volRollingUSD");
    return value!.toBigDecimal();
  }

  set volRollingUSD(value: BigDecimal) {
    this.set("volRollingUSD", Value.fromBigDecimal(value));
  }

  get fees(): BigDecimal {
    let value = this.get("fees");
    return value!.toBigDecimal();
  }

  set fees(value: BigDecimal) {
    this.set("fees", Value.fromBigDecimal(value));
  }

  get feesUSD(): BigDecimal {
    let value = this.get("feesUSD");
    return value!.toBigDecimal();
  }

  set feesUSD(value: BigDecimal) {
    this.set("feesUSD", Value.fromBigDecimal(value));
  }

  get fees30Day(): BigDecimal {
    let value = this.get("fees30Day");
    return value!.toBigDecimal();
  }

  set fees30Day(value: BigDecimal) {
    this.set("fees30Day", Value.fromBigDecimal(value));
  }

  get incentives(): BigDecimal {
    let value = this.get("incentives");
    return value!.toBigDecimal();
  }

  set incentives(value: BigDecimal) {
    this.set("incentives", Value.fromBigDecimal(value));
  }

  get incentivesUSD(): BigDecimal {
    let value = this.get("incentivesUSD");
    return value!.toBigDecimal();
  }

  set incentivesUSD(value: BigDecimal) {
    this.set("incentivesUSD", Value.fromBigDecimal(value));
  }

  get incentives30Day(): BigDecimal {
    let value = this.get("incentives30Day");
    return value!.toBigDecimal();
  }

  set incentives30Day(value: BigDecimal) {
    this.set("incentives30Day", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }

  get tvlSPARTA(): BigDecimal {
    let value = this.get("tvlSPARTA");
    return value!.toBigDecimal();
  }

  set tvlSPARTA(value: BigDecimal) {
    this.set("tvlSPARTA", Value.fromBigDecimal(value));
  }

  get tvlUSD(): BigDecimal {
    let value = this.get("tvlUSD");
    return value!.toBigDecimal();
  }

  set tvlUSD(value: BigDecimal) {
    this.set("tvlUSD", Value.fromBigDecimal(value));
  }

  get tokenPrice(): BigDecimal {
    let value = this.get("tokenPrice");
    return value!.toBigDecimal();
  }

  set tokenPrice(value: BigDecimal) {
    this.set("tokenPrice", Value.fromBigDecimal(value));
  }

  get lpUnits(): BigDecimal {
    let value = this.get("lpUnits");
    return value!.toBigDecimal();
  }

  set lpUnits(value: BigDecimal) {
    this.set("lpUnits", Value.fromBigDecimal(value));
  }
}

export class MetricsPoolHour extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MetricsPoolHour entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MetricsPoolHour must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MetricsPoolHour", id.toString(), this);
    }
  }

  static load(id: string): MetricsPoolHour | null {
    return changetype<MetricsPoolHour | null>(store.get("MetricsPoolHour", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get volSPARTA(): BigDecimal {
    let value = this.get("volSPARTA");
    return value!.toBigDecimal();
  }

  set volSPARTA(value: BigDecimal) {
    this.set("volSPARTA", Value.fromBigDecimal(value));
  }

  get volTOKEN(): BigDecimal {
    let value = this.get("volTOKEN");
    return value!.toBigDecimal();
  }

  set volTOKEN(value: BigDecimal) {
    this.set("volTOKEN", Value.fromBigDecimal(value));
  }

  get volUSD(): BigDecimal {
    let value = this.get("volUSD");
    return value!.toBigDecimal();
  }

  set volUSD(value: BigDecimal) {
    this.set("volUSD", Value.fromBigDecimal(value));
  }

  get volSPARTA24Hr(): BigDecimal {
    let value = this.get("volSPARTA24Hr");
    return value!.toBigDecimal();
  }

  set volSPARTA24Hr(value: BigDecimal) {
    this.set("volSPARTA24Hr", Value.fromBigDecimal(value));
  }

  get volTOKEN24Hr(): BigDecimal {
    let value = this.get("volTOKEN24Hr");
    return value!.toBigDecimal();
  }

  set volTOKEN24Hr(value: BigDecimal) {
    this.set("volTOKEN24Hr", Value.fromBigDecimal(value));
  }

  get volUSD24Hr(): BigDecimal {
    let value = this.get("volUSD24Hr");
    return value!.toBigDecimal();
  }

  set volUSD24Hr(value: BigDecimal) {
    this.set("volUSD24Hr", Value.fromBigDecimal(value));
  }
}
