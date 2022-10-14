import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";
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
