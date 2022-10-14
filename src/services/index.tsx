import useSWR from 'swr'
import {message} from "@/lib/util";
const server = process.env.NEXT_PUBLIC_RESULTFUl||''
export const fetcher = (url:string) => fetch(url).then((res) => res.json());
export interface IAttribute{
    id:number
    name:string,
    zIndex:number
    count:number
}
export interface ITrait{
    id:number
    attributeId:number
    name:string,
    url:string
}
export interface IResponse<T> {
    code:number,
    data:T
    msg:string
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

export const getAttributes = async ()=>{
    const url = `${server}/attributes/list`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }
    const json = await res.json() as IResponse<IAttribute[]>
    if(json.code>=300){
        message.error(json.msg)
        return
    }
    return json.data;
}
export interface IAttributeRequest{
    id:number
    name:string,
    zIndex:number
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

    const json = await res.json()
    return json;
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

    const json = await res.json()
    return json;
}
export const getTraits = async (attributeId:number)=>{
    const url = `${server}/traits/list/${attributeId}`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }
    const json = await res.json() as IResponse<ITrait[]>
    if(json.code>=300){
        message.error(json.msg)
        return
    }
    return json.data;
}

export interface IAddTraitRequest{
    attributeId:number,
    name:string
    url:string
}
export const addTrait = async (params:IAddTraitRequest)=>{
    const url = `${server}/trait`
    const res =  await fetch(url,{
        method:'POST',
        body:JSON.stringify(params)
    })
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json()
    return json;
}

export const delTrait = async (id:number)=>{
    const url = `${server}/trait/${id}`
    const res =  await fetch(url,{
        method:'DELETE',
    })
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json()
    return json;
}

export interface IContractSync {chainId:number,address:string,name:string}

export const contractSync = async (params:IContractSync)=>{
    const url = `${server}/contract/sync`
    const res =  await fetch(url,{
        method:'POST',
        body:JSON.stringify(params)
    })
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json()
    return json;
}
