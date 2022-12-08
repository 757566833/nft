import {message} from "@/lib/util";

export const server = process.env.NEXT_PUBLIC_RESULTFUl||''

export interface IResponse<T> {
    code:number,
    data:T
    msg:string
}



export class Http{
    public static async  Get(url?:string){
        if(url){
            const res =  await fetch(url)
            if( res.status>=300){
                message.error('请求错误')
                return
            }
            const json = await res.json()
            if(json.code>=300){
                message.error(json.msg)
                return
            }
            return json.data;
        }

    }
    public static async  Post<T>(url:string,params?:Record<string, any>){
        const res =  await fetch(url,{
            method:'POST',
            body:JSON.stringify(params)
        })
        if( res.status>=300){
            message.error('请求错误')
            return
        }
        const json = await res.json() as IResponse<T>
        if(json.code>=300){
            message.error(json.msg)
            return
        }
        return json.data;
    }
    public static async  Delete<T>(url:string,params?:Record<string, any>){
        const res =  await fetch(url,{
            method:'DELETE',
            body:JSON.stringify(params)
        })
        if( res.status>=300){
            message.error('请求错误')
            return
        }
        const json = await res.json() as IResponse<T>
        if(json.code>=300){
            message.error(json.msg)
            return
        }
        return json.data;
    }
    public static async  Put<T>(url:string,params?:Record<string, any>){
        const res =  await fetch(url,{
            method:'PUT',
            body:JSON.stringify(params)
        })
        if( res.status>=300){
            message.error('请求错误')
            return
        }
        const json = await res.json() as IResponse<T>
        if(json.code>=300){
            message.error(json.msg)
            return
        }
        return json.data;
    }
    public static async PostForm<T>(url:string,formData?:FormData){
        const res = await fetch(url,{
            method:"POST",
            body: formData,
        })
        return await res.json() as T;
    }
}
