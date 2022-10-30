import React, {useCallback, useEffect, useMemo} from "react";
import {Stack, TextField} from "@mui/material";
import {Modal} from "@/lib/react-component";
import { useForm } from "react-hook-form";
import {useAttribute, useEditAttribute} from "@/http/attribute";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
const {useLocalStorage} = LocalStorage

interface add{
    name:string,
    zIndex:number
}
const defaultParam:add = {
    name:'',
    zIndex:1
}
const EditAttribute:React.FC<{id?:number,onFinish:()=>void,visible:boolean,onCancel:()=>void}> = (props)=>{
    const {onFinish,visible,onCancel,id} = props
    const [editAttribute] = useEditAttribute()
    const { register, handleSubmit,setValue } = useForm<add>({defaultValues:defaultParam});
    const [getAttribute] = useAttribute()
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return null
    }, [chainId, currentContract])
    const getData = useCallback(async (id:number)=>{
        const res = await getAttribute(id)
        if(res){
            setValue("name",res.name)
            setValue("zIndex",res.zIndex)
        }
    },[getAttribute, setValue])
    const handleEdit = useCallback(async (data:add)=>{
        if(id&&current){
            const res = await editAttribute({
                ...data,
                zIndex:Number.parseInt(`${data.zIndex}`),
                id,
                contract:current.address
            })
            if(res){
                onFinish()
            }
        }

    },[current, editAttribute, id, onFinish])
    useEffect(()=>{
        if(id){
            getData(id).then()
        }
    },[getData, id])
    return <>
        <Modal title={'edit attribute'} keepMounted={true} open={visible} onCancel={onCancel} onOk={handleSubmit(handleEdit)}>
            <Stack width={280} padding={1} spacing={2}>
                <TextField fullWidth={true} label={'name'} {...register("name")}/>
                <TextField type={"number"} fullWidth={true} label={'zIndex'} {...register("zIndex")}/>
            </Stack>

        </Modal>
    </>
}
export default EditAttribute;
