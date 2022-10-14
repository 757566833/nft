import React, {useCallback} from "react";
import {Box, Button, Card, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Provider from "@/instance/provider";
import {message} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {CONTRACT_ADDRESS} from "@/constant/contract";
import {GetErc721Factory} from "@/contract";
import {getFee} from "@/utils/fee";

export interface ICreateContract {
    name:string,
    symbol:string
}
const defaultParam :ICreateContract = {
    name:"",
    symbol:""
}
export const General:React.FC = ()=>{
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<ICreateContract>({defaultValues:defaultParam});
    const [wallet] = useWallet()
    const {chainId,isEIP1559} = wallet
    const handleCreate = useCallback(async (data:ICreateContract)=>{
        const provider =  await Provider.getInstance();
        if(!provider||!chainId){
            return message.info("未安装metamask")
        }

        const contractAddress = CONTRACT_ADDRESS[chainId]
        if(!contractAddress){
            return message.info("不支持")
        }
        const erc721Factory = await GetErc721Factory(contractAddress);
        if(erc721Factory){
            const gas = await erc721Factory.estimateGas.createErc721(data.name,data.symbol)
            const fee = await getFee({
                provider,
                isEIP1559,
                gasLimit:gas,
            })
            await erc721Factory.createErc721(data.name,data.symbol,fee)
        }
    },[chainId, isEIP1559])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Contract</Typography>
        <Typography variant={'body2'}>create erc721 contract</Typography>
        <Stack width={484} padding={1} spacing={2} marginTop={1}>
            <TextField fullWidth={true} label={'name'} {...register("name",{required:true})}/>
            <TextField fullWidth={true} label={'symbol'} {...register("symbol",{required:true})}/>
            <Button variant={"contained"} onClick={handleSubmit(handleCreate)}>create</Button>
        </Stack>

    </Box>
}
export default General;
