import {message} from "@/lib/util";
export const server = process.env.NEXT_PUBLIC_RESULTFUl||''

export interface IResponse<T> {
    code:number,
    data:T
    msg:string
}

