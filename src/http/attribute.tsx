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

export const ATTRIBUTES = 'attributes'
export const useAttributes = (params?:{contract?: string,chainId?:string})=>{
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
           await mutate(`${ATTRIBUTES}${params.contract}`)
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
            await mutate(`${ATTRIBUTES}${params.contract}`)
            return res
        }
    },[mutate])

    return [add]
}
