import {message} from "@/lib/util";
import {IResponse, server} from "@/services/index";

export interface ICollection {id:number,name:string,logo:string}

export const getCollections=  ()=>{
    return  `${server}/collections/list`
}

