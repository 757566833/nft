
import {useCallback} from "react";
import {contractSync, getContracts, IContract, IContractSync} from "@/services/contract";
import useSWR from "swr";
import {IResponse} from "@/services";

export const CONTRACT = 'contract'
export const useContracts = (chainId?:number)=>{
    const get = useCallback(async ()=>{
        if(typeof chainId =="number"){
            return await getContracts(chainId)
        }else{
            return [] as IContract[]
        }

    },[chainId]);
    const {data,error,isValidating,mutate} = useSWR(`${CONTRACT}${chainId}`,get)
    return {data,error,isValidating,mutate}
}

export const useSyncContract = ()=>{
    const add = useCallback(async (params:IContractSync)=>{
        const res = await contractSync(params);
        if(res){
            return res
        }
    },[])

    return [add]
}

