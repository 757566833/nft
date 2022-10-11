import React, {useCallback, useEffect, useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import {Modal} from "@/lib/react-component";
import { useForm } from "react-hook-form";
import {useAddAttribute, useEditAttribute} from "@/http/attribute";
import {getAttribute} from "@/services";
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
    const { register, handleSubmit, watch, formState: { errors },reset,setValue } = useForm<add>({defaultValues:defaultParam});
    const getData = useCallback(async (id:number)=>{
        const res = await getAttribute(id)
        if(res){
            setValue("name",res.name)
            setValue("zIndex",res.zIndex)
        }
    },[setValue])
    const handleEdit = useCallback(async (data:add)=>{
        if(id){
            const res = await editAttribute({
                ...data,
                zIndex:Number.parseInt(`${data.zIndex}`),
                id
            })
            if(res){
                onFinish()
            }
        }

    },[editAttribute, id, onFinish])
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
