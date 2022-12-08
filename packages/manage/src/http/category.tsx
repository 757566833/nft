import useSWR, {useSWRConfig} from "swr";
import {
    addCategory, delCategory,
    getCategories,
    IAddCategoryRequest,
} from "@/services/category";
import {useCallback} from "react";

export const CATEGORY = 'category'
export const useCategories = ()=>{
    const {data,error,isValidating,mutate} = useSWR(`${CATEGORY}`,getCategories)

    return {data,error,isValidating,mutate}
}

export const useAddCategory = ()=>{
    const {mutate} = useSWRConfig()
    const add = useCallback(async (params:IAddCategoryRequest)=>{
        const res = await addCategory(params);
        if(res){
            await mutate(`${CATEGORY}`)
            return res
        }
    },[mutate])

    return [add]
}

export const useDelCategory = ()=>{
    const {mutate} = useSWRConfig()
    const del = useCallback(async (id:number)=>{
        const res = await delCategory(id);
        if(res){
            await mutate(`${CATEGORY}`)
            return res
        }
    },[mutate])

    return [del]
}

// export const useEditCategory = ()=>{
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
