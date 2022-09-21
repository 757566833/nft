import JSBI from 'jsbi'

import json from 'core/artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json'
import { keccak256 } from '@ethersproject/solidity'
export const INIT_CODE_HASH = keccak256(['bytes'], [json.bytecode])
console.log(INIT_CODE_HASH)
console.log(INIT_CODE_HASH==process.env.NEXT_PUBLIC_INIT_CODE_HASH)
// export const INIT_CODE_HASH = "0xaae7dc513491fb17b541bd4a9953285ddf2bb20a773374baecc88c4ebada0767"

// export const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export  const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS||''
export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
