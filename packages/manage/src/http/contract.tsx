
import {useCallback} from "react";
import {contractSync, createContract, getContracts, getContractsByChainId, IContractSync} from "@/services/contract";
import useSWR from "swr";
import {useLoading} from "@/lib/react-hook";

export const CONTRACT = 'contract'
export const useContracts = (chainId?:number)=>{
    const get = useCallback(async ()=>{
        if(typeof chainId =="number"){
            return await getContractsByChainId(chainId)
        }else{
            return await getContracts()
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

export  const useCreateContract = ()=>{
    return useLoading(createContract);
}
