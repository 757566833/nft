import useSWR, {useSWRConfig} from "swr";
import {
    addTrait, delTrait,
    getTraits,
    IAddTraitRequest, ITrait,
} from "@/services/trait";
import {useCallback, useMemo} from "react";
import {Http} from "@/services";
import {getAttributes} from "@/services/attribute";

export const useTraits = (params?:{attributeId?: number,chainId?:string})=>{
    return  useSWR<ITrait[]>(getTraits(params),Http.Get)
}

export const useAddTrait = ()=>{
    const {mutate} = useSWRConfig()
   const add = useCallback(async (params:IAddTraitRequest)=>{
       const res = await addTrait(params);
       if(res){

           await mutate(getTraits({attributeId:params.attributeId,chainId:params.chainId}))
           await mutate(getAttributes({contract:params.contract,chainId:params.chainId}))
           return res
       }
   },[mutate])

    return [add]
}

export const useDelTrait = ()=>{
    const {mutate} = useSWRConfig()
    const del = useCallback(async (id:number,attributeId:number,chainId?:string,contract?: string)=>{
        const res = await delTrait(id);
        if(res){
            if(chainId){
                console.log('delete',attributeId,chainId)
                await mutate(getTraits({attributeId,chainId}))
                await mutate(getAttributes({contract,chainId}))
            }
            return res
        }
    },[mutate])

    return [del]
}
