import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";

export interface ICategory{
    id:number
    name:number
    icon:string,
}
export const getCategories = async ()=>{
    const url = `${server}/category/list`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }
    const json = await res.json() as IResponse<ICategory[]>
    if(json.code>=300){
        message.error(json.msg)
        return
    }
    return json.data;
}

export interface IAddCategoryRequest{
    name:string
    icon:string
}
export const addCategory = async (params:IAddCategoryRequest)=>{
    const url = `${server}/category`
    const res =  await fetch(url,{
        method:'POST',
        body:JSON.stringify(params)
    })
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    return await res.json();
}

export const delCategory = async (id:number)=>{
    const url = `${server}/category/${id}`
    const res =  await fetch(url,{
        method:'DELETE',
    })
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    return await res.json();
}
