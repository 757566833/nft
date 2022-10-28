import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Card, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Provider from "@/instance/provider";
import {message, notification} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {CONTRACT_ADDRESS} from "@/constant/contract";
import {GetErc721Factory} from "@/contract";
import {getFee} from "@/utils/fee";
import {Modal} from "@/lib/react-component";

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
            try {
               const tx = await erc721Factory.createErc721(data.name,data.symbol,fee)
               console.log(await tx.wait())
            }catch (e:any) {
                message.error(e.message)
            }

        }
    },[chainId, isEIP1559])
    const [visible,setVisible] = useState(false)
    const handleOpen = useCallback(()=>{
        setVisible(true)
    },[])
    const handleClose = useCallback(()=>{
        setVisible(false)
    },[])
    return <Box>
        <Modal open={visible} title={'create nft contract'} noFooter={true} maxWidth={false} onClose={handleClose}>
            <Box>
                <Stack width={484} padding={1} spacing={2} marginTop={1}>
                    <TextField fullWidth={true} label={'name'} {...register("name",{required:true})}/>
                    <TextField fullWidth={true} label={'symbol'} {...register("symbol",{required:true})}/>
                    <Button variant={"contained"} onClick={handleSubmit(handleCreate)}>create</Button>
                </Stack>
            </Box>
        </Modal>
        <Typography variant={'h4'} fontWeight={"bold"}>Contract</Typography>
        <Typography variant={'body2'}>create erc721 contract</Typography>
        <Box marginTop={2}>
            <Button variant={"contained"} onClick={handleOpen}>create</Button>
        </Box>
    </Box>
}
export default General;