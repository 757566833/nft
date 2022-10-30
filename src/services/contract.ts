import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";

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

    return await res.json();
}
export interface IContract {address:string,name:string,symbol:string,chainId:string,owner:string}
export const getContractsByChainId= async (chainId:number)=>{
    const url = `${server}/contract/list/${chainId}`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json() as IResponse<IContract[]>
    return json.data;
}
export const getContracts= async ()=>{
    const url = `${server}/contract/list`
    const res =  await fetch(url)
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json() as IResponse<IContract[]>
    return json.data;
}

export const refreshContracts= async ()=>{
    const url = `${server}/contract/refresh`
    const res =  await fetch(url,{method:"post"})
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json() as IResponse<unknown>
    return json.data;
}
