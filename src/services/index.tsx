import useSWR from 'swr'
import {message} from "@/lib/util";
const server = process.env.NEXT_PUBLIC_RESULTFUl||''
export const fetcher = (url:string) => fetch(url).then((res) => res.json());
export interface IAttribute{
    id:number
    name:string,
    zIndex:number
}
export interface IResponse<T> {
    code:number,
    data:T
    msg:string
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
export interface IAddAttributeRequest{
    name:string,zIndex:number
}

export const addAttribute = async (params:IAddAttributeRequest)=>{
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


// export const getTraits = async (attributeId:string)=>{
//     const url = `${server}/attributes/list`
//     const res =  await fetch(url)
//     if( res.status>=300){
//         message.error('请求错误')
//         return
//     }
//     const json = await res.json() as IResponse<IAttribute[]>
//     if(json.code>=300){
//         message.error(json.msg)
//         return
//     }
//     return json.data;
// }


