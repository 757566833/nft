import useSWR, {useSWRConfig} from "swr";
import {
    addAttribute,
    addTrait,
    editAttribute,
    getAttributes,
    getTraits,
    IAddTraitRequest,
    IAttributeRequest
} from "@/services";
import {useCallback, useMemo} from "react";

export const TRAITS = 'traits'
export const useTraits = (id:number)=>{
    const get = useCallback(()=>getTraits(id),[id]);
    const {data,error,isValidating,mutate} = useSWR(`TRAITS${id}`,get)

    return {data,error,isValidating,mutate}
}

export const useAddTrait = (id?:number)=>{
    const {mutate} = useSWRConfig()
   const add = useCallback(async (params:IAddTraitRequest)=>{
       const res = await addTrait(params);
       if(res){
           await mutate(`TRAITS${id}`)
           return res
       }
   },[id, mutate])

    return [add]
}

// export const useEditTrait = ()=>{
//     const {mutate} = useSWRConfig()
//     const add = useCallback(async (params:IAttributeRequest)=>{
//         const res = await editAttribute(params);
//         if(res){
//             await mutate(TRAITS)
//             return res
//         }
//     },[mutate])
//
//     return [add]
// }
