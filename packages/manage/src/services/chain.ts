import {IResponse, server} from "@/services/index";
import {message} from "@/lib/util";
// type SDBChain struct {
//     Id            int64  `json:"id"`
//     Rpc           string `json:"rpc"`
//     Block         string `json:"block"`
//     Erc721Factory string `json:"erc721Factory"`
//     Robot         string `json:"robot"`
//     Erc1155       string `json:"erc1155"`
//     Salt          string `json:"salt"`
//     ChainId       string `json:"chainId"`
//     Current       string `json:"current"`
//     Type          int    `json:"type"`
// }
export interface IChain {
    id:number,
    rpc:string,
    erc721Factory:string
    robot:string
    erc1155:string
    salt:string
    chainId:string
    block:string
    type:number
}
export const getChainList=  ()=>{
    return  `${server}/chain/list`
}
export const createChain  = async (chain?:Omit<IChain, "id">)=>{
    const url = `${server}/chain`
    const res =  await fetch(url,{method:"post",body:JSON.stringify(chain)})
    if( res.status>=300){
        message.error('请求错误')
        return
    }

    const json = await res.json() as IResponse<unknown>
    return json.data;
}
