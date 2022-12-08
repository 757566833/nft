import useSWR, {useSWRConfig} from "swr";
import {
    addAttribute,
    editAttribute,
    getAttribute,
    getAttributes,
    IAttribute,
    IAttributeRequest
} from "@/services/attribute";
import {useCallback} from "react";
import {Http} from "@/services";

export const useAttributes = (params?:{contractId?: number})=>{
    return  useSWR<IAttribute[]>(getAttributes(params),Http.Get)
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
           await mutate(getAttributes({contractId:params.contractId}))
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
            await mutate(getAttributes({contractId:params.contractId}))
            return res
        }
    },[mutate])

    return [add]
}
