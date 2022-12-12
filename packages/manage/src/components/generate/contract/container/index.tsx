import React, {useCallback, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Provider from "@/instance/provider";
import {message} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {GetErc721Factory} from "@/contract";
import {getFee} from "@/utils/fee";
import {Modal} from "@/lib/react-component";
import {LoadingButton} from "@mui/lab";
import {useCreateContract} from "@/http/contract";

export interface ICreateContract {
    name:string,
    address:string,
    chainId:string,
    symbol:string,
    owner:string
}
const defaultParam :ICreateContract = {
    name:"",
    address:"",
    chainId:"",
    symbol:"",
    owner:""
}
export const Container:React.FC = ()=>{
    const { register, handleSubmit } = useForm<ICreateContract>({defaultValues:defaultParam});
    const [add,loading] =  useCreateContract();
    const handleCreate = useCallback((data:ICreateContract)=>{
        add(data.name)
    },[add])

    return <Stack spacing={1} direction={"column"}>
        <Typography variant={'h4'} fontWeight={"bold"}>Container</Typography>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant={'body2'}>create no address or custom contract for generate nft </Typography>
        </Stack>
        <Stack spacing={1}>
            <TextField required={true} label={"name"} {...register("name",{required:true})}/>
        </Stack>
        <Stack spacing={1}>
            <TextField label={"address"} {...register("address",{required:false})}/>
        </Stack>
        <Box marginTop={2}>
            <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit(handleCreate)}>create</LoadingButton>
        </Box>
    </Stack>
}
export default Container;
