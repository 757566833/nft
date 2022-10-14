import useSWR, {useSWRConfig} from "swr";
import {
    addTrait, delTrait,
    getTraits,
    IAddTraitRequest,
} from "@/services/trait";
import {useCallback, useMemo} from "react";

export const TRAITS = 'traits'
export const useTraits = (id:number)=>{
    const get = useCallback(()=>getTraits(id),[id]);
    const {data,error,isValidating,mutate} = useSWR(`${TRAITS}${id}`,get)

    return {data,error,isValidating,mutate}
}

export const useAddTrait = ()=>{
    const {mutate} = useSWRConfig()
   const add = useCallback(async (params:IAddTraitRequest)=>{
       const res = await addTrait(params);
       if(res){
           await mutate(`${TRAITS}${params.attributeId}`)
           return res
       }
   },[mutate])

    return [add]
}

export const useDelTrait = ()=>{
    const {mutate} = useSWRConfig()
    const del = useCallback(async (id:number,attributeId:number)=>{
        const res = await delTrait(id);
        if(res){
            await mutate(`${TRAITS}${attributeId}`)
            return res
        }
    },[mutate])

    return [del]
}

// export const useEditTrait = ()=>{
//     const {mutate} = useSWRConfig()
//     const add = useCallback(async (params:IAttributeRequest)=>{
//         const res = await editAttribute(params);
//         if(res){
//             await mutate(${TRAITS})
//             return res
//         }
//     },[mutate])
//
//     return [add]
// }
