import useSWR, {useSWRConfig} from "swr";
import {addAttribute, fetcher, getAttributes, IAddAttributeRequest} from "@/services";
import {useCallback} from "react";

export const ATTRIBUTES = 'attributes'
export const useAttributes = ()=>{
    const {data,error,isValidating,mutate} = useSWR(ATTRIBUTES,getAttributes)

    return {data,error,isValidating,mutate}
}

export const useAddAttribute = ()=>{
    const {mutate} = useSWRConfig()
   const add = useCallback(async (params:IAddAttributeRequest)=>{
       const res = await addAttribute(params);
       if(res){
           await mutate(ATTRIBUTES)
           return res
       }
   },[mutate])

    return [add]
}

