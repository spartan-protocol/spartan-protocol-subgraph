import { Member, PoolFactory, SynthPosition } from "../generated/schema";
import { MemberHarvests } from "../generated/SynthVault/SynthVault";
import { addr_poolFactory, ZERO_BD } from "./const";
import { checkMember, checkSynthPosition, updateDayMetrics } from "./utils";

export function handleMemberHarvests(event: MemberHarvests): void {
  let poolFactory = PoolFactory.load(addr_poolFactory);
  let owner = event.params.member.toHexString();
  let synthAddr = event.params.synth.toHexString();
  let harvested = event.params.amount.toBigDecimal();

  let derivedUsd = harvested.times(poolFactory.spartaDerivedUSD);

  checkMember(owner);
  let member = Member.load(owner);
  member.netSynthHarvestSparta = member.netSynthHarvestSparta.plus(harvested);
  member.netSynthHarvestUsd = member.netSynthHarvestUsd.plus(derivedUsd);
  member.save();

  checkSynthPosition(owner, synthAddr);
  let synthPosition = SynthPosition.load(owner + "#" + synthAddr);
  synthPosition.netSynthHarvestSparta = synthPosition.netSynthHarvestSparta.plus(harvested);
  synthPosition.netSynthHarvestUsd = synthPosition.netSynthHarvestUsd.plus(derivedUsd);
  synthPosition.save();

  updateDayMetrics(
    event.block.timestamp,
    null,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    ZERO_BD,
    harvested,
    ZERO_BD
  );
}
