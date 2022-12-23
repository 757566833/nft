import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";
import {omitEmpty} from "@/utils";

export interface ICollection {
    id:number,
    name:string,
    logo:string
    owner:string
}

export const getCollections=  (params?:Partial<ICollection>)=>{
    const _params = new URLSearchParams(omitEmpty(params as unknown as Record<string, string>));
    return  `${server}/collections/list?${_params}`
}

