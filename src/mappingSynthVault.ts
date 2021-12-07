import { MemberHarvests } from "../generated/SynthVault/SynthVault";
import { ZERO_BD } from "./const";
import { updateDayMetrics } from "./utils";

export function handleMemberHarvests(event: MemberHarvests): void {
  // let owner = event.params.member.toHexString();
  let harvested = event.params.amount.toBigDecimal();

  // let member = Member.load(owner);
  // member.netHarvestSparta = member.netHarvestSparta.plus(harvested);
  // member.netHarvestUsd = member.netHarvestUsd.plus(derivedUSD);
  // member.save();

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
