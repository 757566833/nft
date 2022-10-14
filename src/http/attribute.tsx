import useSWR, {useSWRConfig} from "swr";
import {addAttribute, editAttribute, getAttribute, getAttributes, IAttributeRequest} from "@/services/attribute";
import {useCallback} from "react";

export const ATTRIBUTES = 'attributes'
export const useAttributes = ()=>{
    const {data,error,isValidating,mutate} = useSWR(ATTRIBUTES,getAttributes)

    return {data,error,isValidating,mutate}
}
export const useAttribute = ()=>{
    const get = useCallback((id:number)=>getAttribute(id),[])

    return [get]
}

export const useAddAttribute = ()=>{
    const {mutate} = useSWRConfig()
   const add = useCallback(async (params:Omit<IAttributeRequest, 'id'>)=>{
       const res = await addAttribute(params);
       if(res){
           await mutate(ATTRIBUTES)
           return res
       }
   },[mutate])

    return [add]
}

export const useEditAttribute = ()=>{
    const {mutate} = useSWRConfig()
    const add = useCallback(async (params:IAttributeRequest)=>{
        const res = await editAttribute(params);
        if(res){
            await mutate(ATTRIBUTES)
            return res
        }
    },[mutate])

    return [add]
}
