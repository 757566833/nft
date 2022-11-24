import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";
import {omitEmpty} from "@/utils";

export interface IAttribute{
    id:number
    name:string,
    zIndex:number
    count:number
}
export const getAttribute = async (id:number)=>{

    const url = `${server}/attribute/${id}`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }
    const json = await res.json() as IResponse<Omit<IAttribute, 'count'>>
    if(json.code>=300){
        message.error(json.msg)
        return
    }
    return json.data;
}

export const getAttributes = (params?:{contract?: string,chainId?:string})=>{
    if(params?.contract&&params?.chainId){
        const _params = new URLSearchParams(omitEmpty(params as unknown as Record<string, string>));
        // console.log(`${server}/attributes/list?${_params}`)
        return  `${server}/attributes/list?${_params}`
    }
}
export interface IAttributeRequest{
    id:number
    name:string,
    zIndex:number
    contract:string
    chainId:string
}

export const addAttribute = async (params:Omit<IAttributeRequest, 'id'>)=>{
    const url = `${server}/attribute`
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

export const editAttribute = async (params:IAttributeRequest)=>{
    const url = `${server}/attribute/${params.id}`
    const res =  await fetch(url,{
        method:'PUT',
        body:JSON.stringify(params)
    })
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    return await res.json();
}
