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
import {useContract} from "@/context/contract";

export interface ICreateContract {
    name:string,
    symbol:string
}
const defaultParam :ICreateContract = {
    name:"",
    symbol:""
}
export const General:React.FC = ()=>{
    const { register, handleSubmit } = useForm<ICreateContract>({defaultValues:defaultParam});
    const [wallet] = useWallet()
    const {chainId,isEIP1559} = wallet
    const [loading,setLoading] = useState(false)
    const [contract] = useContract();
    const handleCreate = useCallback(async (data:ICreateContract)=>{
        const provider =  await Provider.getInstance();
        if(!provider||!chainId){
            return message.info("can't find metamask")
        }
        const erc721Factory = await GetErc721Factory(contract);
        if(erc721Factory){
            setLoading(true)
            const gas = await erc721Factory.estimateGas.createErc721(data.name,data.symbol)
            const fee = await getFee({
                provider,
                isEIP1559,
                gasLimit:gas,
            })
            try {
               await erc721Factory.createErc721(data.name,data.symbol,fee)
            }catch (e:any) {
                message.error(e.reason)
            }finally {
                setLoading(false)
            }

        }
    },[contract,chainId, isEIP1559])
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
                    <LoadingButton variant={"contained"} onClick={handleSubmit(handleCreate)} loading={loading}>create</LoadingButton>
                </Stack>
            </Box>
        </Modal>
        <Typography variant={'h4'} fontWeight={"bold"}>Contract</Typography>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant={'body2'}>create erc721 contract on </Typography> <Typography color={"red"} fontWeight={"bold"}>current chain {chainId}</Typography>
        </Stack>

        <Box marginTop={2}>
            <Button variant={"contained"} onClick={handleOpen}>create</Button>
        </Box>
    </Box>
}
export default General;
