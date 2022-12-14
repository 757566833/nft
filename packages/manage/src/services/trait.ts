import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";
import {omitEmpty} from "@/utils";

export interface ITrait{
    id:number
    attributeId:number
    attributeName:string,
    name:string,
    url:string
}
export const getTraits = (params?:{attributeId?: number,chainId?:string})=>{
    if(params?.attributeId&&params?.chainId){
        const _params = new URLSearchParams(omitEmpty(params as unknown as Record<string, string>));
        return  `${server}/traits/list?${_params}`
    }
    //
    // const url = `${server}/traits/list/${attributeId}`
    // const res =  await fetch(url)
    // if( res.status>=300){
    //     message.error('请求错误')
    //     return
    // }
    // const json = await res.json() as IResponse<ITrait[]>
    // if(json.code>=300){
    //     message.error(json.msg)
    //     return
    // }
    // return json.data;
}

export interface IAddTraitRequest{
    attributeId:number,
    name:string
    url:string
    contract:string
    chainId:string
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

    return await res.json();
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

    return await res.json();
}
