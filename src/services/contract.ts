import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";
import {IAttribute} from "@/services/attribute";

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
export interface IContract {
    address:string,
    name:string
    chainId:number
}
export const getContracts= async (chainId:number)=>{
    const url = `${server}/contract/list/${chainId}`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json() as IResponse<IContract[]>
    return json.data;
}
