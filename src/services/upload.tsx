import {IResponse, server} from "@/services/index";
import {message} from "@/lib/util";

const fileServer = process.env.NEXT_PUBLIC_FILE||''

export const upload = async (formData:FormData)=>{
    const url = `${fileServer}/upload/nft`;
    const res = await fetch(url,{
        method:"POST",
        body: formData,
    })
    return await res.json();
}
export const ipfsUpload = async (formData:FormData)=>{
    const url = `${server}/ipfs/upload`;
    const res = await fetch(url,{
        method:"POST",
        body: formData,
    })
    if(res.status<300){
        return await res.json() as IResponse<string>;
    }else{
        message.error("error")
    }

}
