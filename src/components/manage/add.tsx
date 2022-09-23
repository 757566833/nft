import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Input, Stack, TextField} from "@mui/material";
import {Modal} from "@/lib/react-component";
import { useForm } from "react-hook-form";
import useSWR, {useSWRConfig} from "swr";
import {fetcher} from "@/services";
import {useAddAttribute} from "@/http";
interface add{
    name:string,
    zIndex:number
}
const defaultParam:add = {
    name:'',
    zIndex:1
}
const Add:React.FC = ()=>{
    const [addAttribute] = useAddAttribute()
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<add>({defaultValues:defaultParam});

    const [addVisible,setAddVisible] = useState(false)
    const handleOpenAdd = useCallback(()=>{
        setAddVisible(true)
    },[])
    const handleCloseAdd = useCallback(()=>{
        setAddVisible(false)
    },[])
    const handleAdd = useCallback(async (data:add)=>{
       const res = await addAttribute(data)
       console.log(res)
    },[addAttribute])
    useEffect(()=>{
        if(!addVisible){
            reset()
        }

    },[addVisible, reset])
    return <>
        <Modal title={'add attribute'} keepMounted={true} open={addVisible} onCancel={handleCloseAdd} onOk={handleSubmit(handleAdd)}>
            <Stack width={280} padding={1} spacing={2}>
                <TextField fullWidth={true} label={'name'} {...register("name")}/>
                <TextField type={"number"} fullWidth={true} label={'zIndex'} {...register("zIndex")}/>
            </Stack>

        </Modal>
        <Button variant={"outlined"} onClick={handleOpenAdd}>
            new attribute
        </Button>
    </>
}
export default Add;
