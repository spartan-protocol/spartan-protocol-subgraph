import { Pool } from "../generated/PoolFactory/Pool";
import { iBEP20 } from "../generated/PoolFactory/iBEP20";
import { iBEP20SymbolBytes } from "../generated/PoolFactory/iBEP20SymbolBytes";
import { iBEP20NameBytes } from "../generated/PoolFactory/iBEP20NameBytes";
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Transaction } from '../generated/schema'

export function fetchPoolL1(poolAddress: Address): Address {
  let contract = Pool.bind(poolAddress);
  let l1Value = Address.fromString("unknown");
  let l1Result = contract.try_TOKEN();
  if (!l1Result.reverted) {
    l1Value = l1Result.value;
  }
  return l1Value;
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = iBEP20.bind(tokenAddress);
  let contractSymbolBytes = iBEP20SymbolBytes.bind(tokenAddress);

  // try types string and bytes32 for symbol
  let symbolValue = "unknown";
  let symbolResult = contract.try_symbol();
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol();
    if (!symbolResultBytes.reverted) {
      // for broken tokens that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString();
      }
    }
  } else {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = iBEP20.bind(tokenAddress);
  let contractNameBytes = iBEP20NameBytes.bind(tokenAddress);

  // try types string and bytes32 for name
  let nameValue = "unknown";
  let nameResult = contract.try_name();
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name();
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString();
      }
    }
  } else {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = iBEP20.bind(tokenAddress);
  let totalSupplyValue = null;
  let totalSupplyResult = contract.try_totalSupply();
  if (!totalSupplyResult.reverted) {
    totalSupplyValue = totalSupplyResult as i32;
  }
  return BigInt.fromI32(totalSupplyValue as i32);
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = iBEP20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = null;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }

  return BigInt.fromI32(decimalValue as i32);
}

export function isNullEthValue(value: string): boolean {
  return (
    value ==
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );
}

export function loadTransaction(event: ethereum.Event): Transaction {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString())
  }
  transaction.blockNumber = event.block.number
  transaction.timestamp = event.block.timestamp
  transaction.gasUsed = event.transaction.gasUsed
  transaction.gasPrice = event.transaction.gasPrice
  transaction.save()
  return transaction as Transaction
}