
import {useCallback} from "react";
import {contractSync, IContractSync} from "@/services";

export const useSyncContract = ()=>{
    const add = useCallback(async (params:IContractSync)=>{
        const res = await contractSync(params);
        if(res){
            return res
        }
    },[])

    return [add]
}
