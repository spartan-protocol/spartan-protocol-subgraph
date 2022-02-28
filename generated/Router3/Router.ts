// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Dividend extends ethereum.Event {
  get params(): Dividend__Params {
    return new Dividend__Params(this);
  }
}

export class Dividend__Params {
  _event: Dividend;

  constructor(event: Dividend) {
    this._event = event;
  }

  get Pool(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Router extends ethereum.SmartContract {
  static bind(address: Address): Router {
    return new Router("Router", address);
  }

  diviClaim(): BigInt {
    let result = super.call("diviClaim", "diviClaim():(uint256)", []);

    return result[0].toBigInt();
  }

  try_diviClaim(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("diviClaim", "diviClaim():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastMonth(): BigInt {
    let result = super.call("lastMonth", "lastMonth():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastMonth(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lastMonth", "lastMonth():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  mapAddress_30DayDividends(param0: Address): BigInt {
    let result = super.call(
      "mapAddress_30DayDividends",
      "mapAddress_30DayDividends(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_mapAddress_30DayDividends(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "mapAddress_30DayDividends",
      "mapAddress_30DayDividends(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  mapAddress_Past30DayPoolDividends(param0: Address): BigInt {
    let result = super.call(
      "mapAddress_Past30DayPoolDividends",
      "mapAddress_Past30DayPoolDividends(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_mapAddress_Past30DayPoolDividends(
    param0: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "mapAddress_Past30DayPoolDividends",
      "mapAddress_Past30DayPoolDividends(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  minDiv(): BigInt {
    let result = super.call("minDiv", "minDiv():(uint256)", []);

    return result[0].toBigInt();
  }

  try_minDiv(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("minDiv", "minDiv():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  synthMinting(): boolean {
    let result = super.call("synthMinting", "synthMinting():(bool)", []);

    return result[0].toBoolean();
  }

  try_synthMinting(): ethereum.CallResult<boolean> {
    let result = super.tryCall("synthMinting", "synthMinting():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _base(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _wbnb(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RTCCall extends ethereum.Call {
  get inputs(): RTCCall__Inputs {
    return new RTCCall__Inputs(this);
  }

  get outputs(): RTCCall__Outputs {
    return new RTCCall__Outputs(this);
  }
}

export class RTCCall__Inputs {
  _call: RTCCall;

  constructor(call: RTCCall) {
    this._call = call;
  }

  get poolRTC(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _pool(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RTCCall__Outputs {
  _call: RTCCall;

  constructor(call: RTCCall) {
    this._call = call;
  }
}

export class _migrateRevenueCall extends ethereum.Call {
  get inputs(): _migrateRevenueCall__Inputs {
    return new _migrateRevenueCall__Inputs(this);
  }

  get outputs(): _migrateRevenueCall__Outputs {
    return new _migrateRevenueCall__Outputs(this);
  }
}

export class _migrateRevenueCall__Inputs {
  _call: _migrateRevenueCall;

  constructor(call: _migrateRevenueCall) {
    this._call = call;
  }

  get oldRouter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class _migrateRevenueCall__Outputs {
  _call: _migrateRevenueCall;

  constructor(call: _migrateRevenueCall) {
    this._call = call;
  }
}

export class AddLiquidityCall extends ethereum.Call {
  get inputs(): AddLiquidityCall__Inputs {
    return new AddLiquidityCall__Inputs(this);
  }

  get outputs(): AddLiquidityCall__Outputs {
    return new AddLiquidityCall__Outputs(this);
  }
}

export class AddLiquidityCall__Inputs {
  _call: AddLiquidityCall;

  constructor(call: AddLiquidityCall) {
    this._call = call;
  }

  get inputToken(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get baseAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class AddLiquidityCall__Outputs {
  _call: AddLiquidityCall;

  constructor(call: AddLiquidityCall) {
    this._call = call;
  }
}

export class AddLiquidityAsymCall extends ethereum.Call {
  get inputs(): AddLiquidityAsymCall__Inputs {
    return new AddLiquidityAsymCall__Inputs(this);
  }

  get outputs(): AddLiquidityAsymCall__Outputs {
    return new AddLiquidityAsymCall__Outputs(this);
  }
}

export class AddLiquidityAsymCall__Inputs {
  _call: AddLiquidityAsymCall;

  constructor(call: AddLiquidityAsymCall) {
    this._call = call;
  }

  get input(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get fromBase(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class AddLiquidityAsymCall__Outputs {
  _call: AddLiquidityAsymCall;

  constructor(call: AddLiquidityAsymCall) {
    this._call = call;
  }
}

export class AddLiquidityAsymForMemberCall extends ethereum.Call {
  get inputs(): AddLiquidityAsymForMemberCall__Inputs {
    return new AddLiquidityAsymForMemberCall__Inputs(this);
  }

  get outputs(): AddLiquidityAsymForMemberCall__Outputs {
    return new AddLiquidityAsymForMemberCall__Outputs(this);
  }
}

export class AddLiquidityAsymForMemberCall__Inputs {
  _call: AddLiquidityAsymForMemberCall;

  constructor(call: AddLiquidityAsymForMemberCall) {
    this._call = call;
  }

  get _input(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _fromBase(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _member(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class AddLiquidityAsymForMemberCall__Outputs {
  _call: AddLiquidityAsymForMemberCall;

  constructor(call: AddLiquidityAsymForMemberCall) {
    this._call = call;
  }
}

export class AddLiquidityForMemberCall extends ethereum.Call {
  get inputs(): AddLiquidityForMemberCall__Inputs {
    return new AddLiquidityForMemberCall__Inputs(this);
  }

  get outputs(): AddLiquidityForMemberCall__Outputs {
    return new AddLiquidityForMemberCall__Outputs(this);
  }
}

export class AddLiquidityForMemberCall__Inputs {
  _call: AddLiquidityForMemberCall;

  constructor(call: AddLiquidityForMemberCall) {
    this._call = call;
  }

  get inputToken(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get baseAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get member(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class AddLiquidityForMemberCall__Outputs {
  _call: AddLiquidityForMemberCall;

  constructor(call: AddLiquidityForMemberCall) {
    this._call = call;
  }

  get LPsMinted(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class BuyToCall extends ethereum.Call {
  get inputs(): BuyToCall__Inputs {
    return new BuyToCall__Inputs(this);
  }

  get outputs(): BuyToCall__Outputs {
    return new BuyToCall__Outputs(this);
  }
}

export class BuyToCall__Inputs {
  _call: BuyToCall;

  constructor(call: BuyToCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get member(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get minAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class BuyToCall__Outputs {
  _call: BuyToCall;

  constructor(call: BuyToCall) {
    this._call = call;
  }
}

export class ChangeDiviClaimCall extends ethereum.Call {
  get inputs(): ChangeDiviClaimCall__Inputs {
    return new ChangeDiviClaimCall__Inputs(this);
  }

  get outputs(): ChangeDiviClaimCall__Outputs {
    return new ChangeDiviClaimCall__Outputs(this);
  }
}

export class ChangeDiviClaimCall__Inputs {
  _call: ChangeDiviClaimCall;

  constructor(call: ChangeDiviClaimCall) {
    this._call = call;
  }

  get _newDiviClaim(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _newDivFee(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ChangeDiviClaimCall__Outputs {
  _call: ChangeDiviClaimCall;

  constructor(call: ChangeDiviClaimCall) {
    this._call = call;
  }
}

export class ChangeSynthCapCall extends ethereum.Call {
  get inputs(): ChangeSynthCapCall__Inputs {
    return new ChangeSynthCapCall__Inputs(this);
  }

  get outputs(): ChangeSynthCapCall__Outputs {
    return new ChangeSynthCapCall__Outputs(this);
  }
}

export class ChangeSynthCapCall__Inputs {
  _call: ChangeSynthCapCall;

  constructor(call: ChangeSynthCapCall) {
    this._call = call;
  }

  get synthCap(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _pool(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ChangeSynthCapCall__Outputs {
  _call: ChangeSynthCapCall;

  constructor(call: ChangeSynthCapCall) {
    this._call = call;
  }
}

export class FlipSynthMintingCall extends ethereum.Call {
  get inputs(): FlipSynthMintingCall__Inputs {
    return new FlipSynthMintingCall__Inputs(this);
  }

  get outputs(): FlipSynthMintingCall__Outputs {
    return new FlipSynthMintingCall__Outputs(this);
  }
}

export class FlipSynthMintingCall__Inputs {
  _call: FlipSynthMintingCall;

  constructor(call: FlipSynthMintingCall) {
    this._call = call;
  }
}

export class FlipSynthMintingCall__Outputs {
  _call: FlipSynthMintingCall;

  constructor(call: FlipSynthMintingCall) {
    this._call = call;
  }
}

export class PurgeDeployerCall extends ethereum.Call {
  get inputs(): PurgeDeployerCall__Inputs {
    return new PurgeDeployerCall__Inputs(this);
  }

  get outputs(): PurgeDeployerCall__Outputs {
    return new PurgeDeployerCall__Outputs(this);
  }
}

export class PurgeDeployerCall__Inputs {
  _call: PurgeDeployerCall;

  constructor(call: PurgeDeployerCall) {
    this._call = call;
  }
}

export class PurgeDeployerCall__Outputs {
  _call: PurgeDeployerCall;

  constructor(call: PurgeDeployerCall) {
    this._call = call;
  }
}

export class RemoveLiquidityExactCall extends ethereum.Call {
  get inputs(): RemoveLiquidityExactCall__Inputs {
    return new RemoveLiquidityExactCall__Inputs(this);
  }

  get outputs(): RemoveLiquidityExactCall__Outputs {
    return new RemoveLiquidityExactCall__Outputs(this);
  }
}

export class RemoveLiquidityExactCall__Inputs {
  _call: RemoveLiquidityExactCall;

  constructor(call: RemoveLiquidityExactCall) {
    this._call = call;
  }

  get units(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RemoveLiquidityExactCall__Outputs {
  _call: RemoveLiquidityExactCall;

  constructor(call: RemoveLiquidityExactCall) {
    this._call = call;
  }
}

export class RemoveLiquidityExactAsymCall extends ethereum.Call {
  get inputs(): RemoveLiquidityExactAsymCall__Inputs {
    return new RemoveLiquidityExactAsymCall__Inputs(this);
  }

  get outputs(): RemoveLiquidityExactAsymCall__Outputs {
    return new RemoveLiquidityExactAsymCall__Outputs(this);
  }
}

export class RemoveLiquidityExactAsymCall__Inputs {
  _call: RemoveLiquidityExactAsymCall;

  constructor(call: RemoveLiquidityExactAsymCall) {
    this._call = call;
  }

  get units(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get toBase(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class RemoveLiquidityExactAsymCall__Outputs {
  _call: RemoveLiquidityExactAsymCall;

  constructor(call: RemoveLiquidityExactAsymCall) {
    this._call = call;
  }
}

export class SellToCall extends ethereum.Call {
  get inputs(): SellToCall__Inputs {
    return new SellToCall__Inputs(this);
  }

  get outputs(): SellToCall__Outputs {
    return new SellToCall__Outputs(this);
  }
}

export class SellToCall__Inputs {
  _call: SellToCall;

  constructor(call: SellToCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get member(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get minAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SellToCall__Outputs {
  _call: SellToCall;

  constructor(call: SellToCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SwapCall extends ethereum.Call {
  get inputs(): SwapCall__Inputs {
    return new SwapCall__Inputs(this);
  }

  get outputs(): SwapCall__Outputs {
    return new SwapCall__Outputs(this);
  }
}

export class SwapCall__Inputs {
  _call: SwapCall;

  constructor(call: SwapCall) {
    this._call = call;
  }

  get inputAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get fromToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get toToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get minAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SwapCall__Outputs {
  _call: SwapCall;

  constructor(call: SwapCall) {
    this._call = call;
  }
}

export class SwapAssetToSynthCall extends ethereum.Call {
  get inputs(): SwapAssetToSynthCall__Inputs {
    return new SwapAssetToSynthCall__Inputs(this);
  }

  get outputs(): SwapAssetToSynthCall__Outputs {
    return new SwapAssetToSynthCall__Outputs(this);
  }
}

export class SwapAssetToSynthCall__Inputs {
  _call: SwapAssetToSynthCall;

  constructor(call: SwapAssetToSynthCall) {
    this._call = call;
  }

  get inputAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get fromToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get toSynth(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SwapAssetToSynthCall__Outputs {
  _call: SwapAssetToSynthCall;

  constructor(call: SwapAssetToSynthCall) {
    this._call = call;
  }
}

export class SwapSynthToAssetCall extends ethereum.Call {
  get inputs(): SwapSynthToAssetCall__Inputs {
    return new SwapSynthToAssetCall__Inputs(this);
  }

  get outputs(): SwapSynthToAssetCall__Outputs {
    return new SwapSynthToAssetCall__Outputs(this);
  }
}

export class SwapSynthToAssetCall__Inputs {
  _call: SwapSynthToAssetCall;

  constructor(call: SwapSynthToAssetCall) {
    this._call = call;
  }

  get inputAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get fromSynth(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get toToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SwapSynthToAssetCall__Outputs {
  _call: SwapSynthToAssetCall;

  constructor(call: SwapSynthToAssetCall) {
    this._call = call;
  }
}

export class SwapToCall extends ethereum.Call {
  get inputs(): SwapToCall__Inputs {
    return new SwapToCall__Inputs(this);
  }

  get outputs(): SwapToCall__Outputs {
    return new SwapToCall__Outputs(this);
  }
}

export class SwapToCall__Inputs {
  _call: SwapToCall;

  constructor(call: SwapToCall) {
    this._call = call;
  }

  get inputAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get fromToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get toToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get member(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get minAmount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class SwapToCall__Outputs {
  _call: SwapToCall;

  constructor(call: SwapToCall) {
    this._call = call;
  }
}

export class SyncPoolCall extends ethereum.Call {
  get inputs(): SyncPoolCall__Inputs {
    return new SyncPoolCall__Inputs(this);
  }

  get outputs(): SyncPoolCall__Outputs {
    return new SyncPoolCall__Outputs(this);
  }
}

export class SyncPoolCall__Inputs {
  _call: SyncPoolCall;

  constructor(call: SyncPoolCall) {
    this._call = call;
  }

  get _pool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SyncPoolCall__Outputs {
  _call: SyncPoolCall;

  constructor(call: SyncPoolCall) {
    this._call = call;
  }
}

export class UpdatePoolStatusCall extends ethereum.Call {
  get inputs(): UpdatePoolStatusCall__Inputs {
    return new UpdatePoolStatusCall__Inputs(this);
  }

  get outputs(): UpdatePoolStatusCall__Outputs {
    return new UpdatePoolStatusCall__Outputs(this);
  }
}

export class UpdatePoolStatusCall__Inputs {
  _call: UpdatePoolStatusCall;

  constructor(call: UpdatePoolStatusCall) {
    this._call = call;
  }
}

export class UpdatePoolStatusCall__Outputs {
  _call: UpdatePoolStatusCall;

  constructor(call: UpdatePoolStatusCall) {
    this._call = call;
  }
}

export class ZapLiquidityCall extends ethereum.Call {
  get inputs(): ZapLiquidityCall__Inputs {
    return new ZapLiquidityCall__Inputs(this);
  }

  get outputs(): ZapLiquidityCall__Outputs {
    return new ZapLiquidityCall__Outputs(this);
  }
}

export class ZapLiquidityCall__Inputs {
  _call: ZapLiquidityCall;

  constructor(call: ZapLiquidityCall) {
    this._call = call;
  }

  get unitsInput(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get fromPool(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get toPool(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ZapLiquidityCall__Outputs {
  _call: ZapLiquidityCall;

  constructor(call: ZapLiquidityCall) {
    this._call = call;
  }
}
