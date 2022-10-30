import {ethers} from "ethers";
import {BN, stripHexPrefix} from 'ethereumjs-util';
import {Overrides} from "@ethersproject/contracts/src.ts";
const hexToBN = (inputHex: string) => {
    return new BN(stripHexPrefix(inputHex), 16);
};
const fromHex = (value: string | BN): BN => {
    if (BN.isBN(value)) {
        return value;
    }
    return new BN(hexToBN(value).toString(10));
};
type ExistingFeeHistoryBlock<Percentile extends number> = {
    number: BN;
    baseFeePerGas: BN;
    gasUsedRatio: number;
    priorityFeesByPercentile: Record<Percentile, BN>;
};
type NextFeeHistoryBlock = {
    number: BN;
    baseFeePerGas: BN;
};

type FeeHistoryBlock<Percentile extends number> =
    | ExistingFeeHistoryBlock<Percentile>
    | NextFeeHistoryBlock;


const PRIORITY_LEVELS = ['low', 'medium', 'high'] as const;
type PriorityLevel = typeof PRIORITY_LEVELS[number];
const SETTINGS_BY_PRIORITY_LEVEL: {
    [key: string]: {
        percentile: number,
        // 基础费用的百分比系数
        baseFeePercentageMultiplier: BN
        // 优先费用的百分比系数
        priorityFeePercentageMultiplier: BN
        // 建议 优先的最高费用
        minSuggestedMaxPriorityFeePerGas: BN
        // 时间相关
        estimatedWaitTimes: {
            minWaitTimeEstimate: number,
            maxWaitTimeEstimate: number,
        }
    }
} = {
    low: {
        percentile: 10 as number,
        baseFeePercentageMultiplier: new BN(110),
        priorityFeePercentageMultiplier: new BN(94),
        minSuggestedMaxPriorityFeePerGas: new BN(1_000_000_000),
        estimatedWaitTimes: {
            minWaitTimeEstimate: 15_000,
            maxWaitTimeEstimate: 30_000,
        },
    },
    medium: {
        percentile: 20 as number,
        baseFeePercentageMultiplier: new BN(120),
        priorityFeePercentageMultiplier: new BN(97),
        minSuggestedMaxPriorityFeePerGas: new BN(1_500_000_000),
        estimatedWaitTimes: {
            minWaitTimeEstimate: 15_000,
            maxWaitTimeEstimate: 45_000,
        },
    },
    high: {
        percentile: 30 as number,
        baseFeePercentageMultiplier: new BN(125),
        priorityFeePercentageMultiplier: new BN(98),
        minSuggestedMaxPriorityFeePerGas: new BN(2_000_000_000),
        estimatedWaitTimes: {
            minWaitTimeEstimate: 15_000,
            maxWaitTimeEstimate: 60_000,
        },
    },
};
export type Eip1559GasFee = {
    minWaitTimeEstimate: number; // a time duration in milliseconds
    maxWaitTimeEstimate: number; // a time duration in milliseconds
    suggestedMaxPriorityFeePerGas: string; // a GWEI decimal number
    suggestedMaxFeePerGas: string; // a GWEI decimal number
};
const medianOf = (numbers: BN[]): BN => {
    const sortedNumbers = numbers.slice().sort((a, b) => a.cmp(b));
    const len = sortedNumbers.length;
    const index = Math.floor((len - 1) / 2);
    return sortedNumbers[index];
};
const calculateEstimatesForPriorityLevel = (
    priorityLevel: PriorityLevel,
    blocks: FeeHistoryBlock<number>[],
): Eip1559GasFee => {
    // 获取 高中低的 具体一个配置
    const settings = SETTINGS_BY_PRIORITY_LEVEL[priorityLevel];

    // 最后一个块的 base fee
    const latestBaseFeePerGas = blocks[blocks.length - 1].baseFeePerGas;

    // 根据系数计算 base fee
    const adjustedBaseFee = latestBaseFeePerGas
        .mul(settings.baseFeePercentageMultiplier)
        .divn(100);
    // 优先级  根据系数计算 不用等级的优先费用
    const priorityFees = blocks
        .map((block) => {
            return 'priorityFeesByPercentile' in block ?
                block.priorityFeesByPercentile[settings.percentile] :
                null;
        })
        .filter(BN.isBN);
    // 取中间值
    const medianPriorityFee = medianOf(priorityFees);
    // PriorityFee 根据系数计算
    const adjustedPriorityFee = medianPriorityFee
        .mul(settings.priorityFeePercentageMultiplier)
        .divn(100);

    // 算出来的和配置的哪个大选哪个
    const suggestedMaxPriorityFeePerGas = BN.max(
        adjustedPriorityFee,
        settings.minSuggestedMaxPriorityFeePerGas,
    );
    // base fee 加上 大的那个
    const suggestedMaxFeePerGas = adjustedBaseFee.add(
        suggestedMaxPriorityFeePerGas,
    );

    return {
        ...settings.estimatedWaitTimes,
        suggestedMaxPriorityFeePerGas: suggestedMaxPriorityFeePerGas.toString(),
        suggestedMaxFeePerGas: suggestedMaxFeePerGas.toString(),
    };
};
type SourcedGasFeeEstimates = {
    low: Eip1559GasFee;
    medium: Eip1559GasFee;
    high: Eip1559GasFee;
    estimatedBaseFee: string;
    historicalBaseFeeRange: [string, string];
    baseFeeTrend: 'up' | 'down' | 'level';
    latestPriorityFeeRange: [string, string];
    historicalPriorityFeeRange: [string, string];
    priorityFeeTrend: 'up' | 'down' | 'level';
    networkCongestion: number;
};

type FallbackGasFeeEstimates = {
    low: Eip1559GasFee;
    medium: Eip1559GasFee;
    high: Eip1559GasFee;
    estimatedBaseFee: string;
    historicalBaseFeeRange: null;
    baseFeeTrend: null;
    latestPriorityFeeRange: null;
    historicalPriorityFeeRange: null;
    priorityFeeTrend: null;
    networkCongestion: null;
};

export type GasFeeEstimates = SourcedGasFeeEstimates | FallbackGasFeeEstimates;

export const guessEIP1559Fee= async (provider:ethers.providers.JsonRpcProvider,level:"low"|"medium"|"high" ="medium" ):Promise<Eip1559GasFee|undefined>=>{
    let block;
    try {
        // 获取最后一个块
        block = await provider.getBlock('latest');
    } catch (e: any) {
        return;
    }
    if (!block.baseFeePerGas) {
        return;
    }
    // 计算的范围
    const blockRangeLength = 5;
    // 加权
    const percentiles = [10, 20, 30];
    // 获取最近的块 fee的信息
    const response: {
        oldestBlock: string,
        baseFeePerGas: string[],
        gasUsedRatio: number[]
        reward: string[][]
    } = await provider.send('eth_feeHistory', [`0x${blockRangeLength.toString(16)}`, `0x${block.number.toString(16)}`, percentiles]);
    // 范围内 第一个块
    const startBlockNumber = fromHex(response.oldestBlock);
    // 会获取到blockRangeLength+1个 截取一下
    const baseFeesPerGasAsHex = response.baseFeePerGas.slice(0, blockRangeLength);
    //
    const gasUsedRatios = response.gasUsedRatio;
    //
    const priorityFeePercentileGroups = response.reward ?? [];
    //
    const blocks = baseFeesPerGasAsHex.map((baseFeePerGasAsHex, blockIndex) => {
        const baseFeePerGas = fromHex(baseFeePerGasAsHex);
        const number = startBlockNumber.addn(blockIndex);

        const gasUsedRatio = gasUsedRatios[blockIndex] || null;
        const priorityFeesForEachPercentile = priorityFeePercentileGroups[blockIndex];
        // 叠加 看起来是挖矿奖励相关
        const priorityFeesByPercentile = percentiles.reduce(
            (obj, percentile, percentileIndex) => {
                const priorityFee = priorityFeesForEachPercentile ? priorityFeesForEachPercentile[percentileIndex] : '0';
                return {...obj, [percentile]: fromHex(priorityFee)};
            },
            {} as Record<number, BN>,
        ) || null;
        return {
            number,
            baseFeePerGas,
            gasUsedRatio,
            priorityFeesByPercentile,

        };
    });

    const levelSpecificEstimates = PRIORITY_LEVELS.reduce((obj, priorityLevel) => {
        const gasEstimatesForPriorityLevel = calculateEstimatesForPriorityLevel(
            priorityLevel,
            blocks,
        );
        return {...obj, [priorityLevel]: gasEstimatesForPriorityLevel};
    }, {} as Pick<GasFeeEstimates, PriorityLevel>);
    return levelSpecificEstimates[level]
}
export const guessPrice = async (provider:ethers.providers.JsonRpcProvider,level:"low"|"medium"|"high" ="medium")=>{
    const bn = await provider.getGasPrice();

    let result = bn ;
    switch (level) {
        case "low":
            result = bn.mul(110).div(100)
            break;
        case "medium":
            result = bn.mul(120).div(100)
            break
        case "high":
            result = bn.mul(130).div(100)
            break
    }
    return result
}
export const getFee = async (params:{
    provider:ethers.providers.JsonRpcProvider,
    gasLimit:ethers.BigNumber
    isEIP1559?:boolean
})=>{
    const {gasLimit,isEIP1559,provider} = params;
    const parameter :Overrides={
        gasLimit:gasLimit
    }
    const price = await guessPrice(provider)
    if(isEIP1559){
        const res = await guessEIP1559Fee(provider)
        if(res){
            parameter.type = 2;
            parameter.maxFeePerGas = res.suggestedMaxFeePerGas;
            parameter.maxPriorityFeePerGas = res.suggestedMaxPriorityFeePerGas
        }else{
            parameter.gasPrice = price
        }
    }else{
        parameter.gasPrice = price
    }
    return parameter;
}
