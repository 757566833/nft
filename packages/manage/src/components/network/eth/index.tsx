import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Refresh} from "@mui/icons-material";
import {useNetworkList, useCreateNetwork} from "@/http/network";
import {Modal} from "@/lib/react-component";
import {useForm} from "react-hook-form";
import {INetwork} from "@/services/network";
import {ethers} from "ethers";
import {message} from "@/lib/util";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 100 ,disableColumnMenu:true,sortable:false},

    { field: 'rpc', headerName: 'rpc', width: 198 ,disableColumnMenu:true,sortable:false},
    { field: 'chainId', headerName: 'chainId', width: 198 ,disableColumnMenu:true,sortable:false},
    { field: 'block', headerName: 'start block', width: 200 ,disableColumnMenu:true,sortable:false},
    { field: 'current', headerName: 'current', width: 198 ,disableColumnMenu:true,sortable:false},
    { field: 'erc721Factory', headerName: 'erc721Factory', width: 198 ,disableColumnMenu:true,sortable:false},
    { field: 'erc1155', headerName: 'erc1155', width: 198 ,disableColumnMenu:true,sortable:false},
    { field: 'robot', headerName: 'robot', width: 198 ,disableColumnMenu:true,sortable:false},
];
const createDefault:Omit<INetwork, "id"|"chainId"|"type"|"block"> = {
    rpc:'',
    erc721Factory:'',
    robot:'',
    erc1155:'',
    salt:'',
}
export const Eth:React.FC = ()=>{
    const { register, handleSubmit ,formState:{errors},watch,reset} = useForm<Omit<INetwork, "id"|"chainId"|"type"|"current">>({defaultValues:createDefault,mode:"onBlur"});
    const [visible,setVisible] = useState(false);
    const {data,mutate} = useNetworkList();
    const [rpcHelpText,setRpcHelpText] = useState("rpc");
    const [create] = useCreateNetwork();
    const [createLoading,setCreateLoading] = useState(false)
    const rpc = watch("rpc")
    const validateRpc = useCallback(async (rpc:string)=>{
        setCreateLoading(true)
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const {chainId} = await provider.getNetwork();
            setRpcHelpText(`address is ${rpc}, chain id is ${chainId.toString()}`)
            return true
        }catch (e) {
            return  false
        }finally {
            setCreateLoading(false)
        }

    },[])
    const validateHash = useCallback(async (hash:string)=>{
        setCreateLoading(true)
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            await provider.getTransactionReceipt(hash);
            return true
        }catch (e) {
            return  false
        }
        finally {
            setCreateLoading(false)
        }

    },[rpc])
    const handleCreate = useCallback(async (data:Omit<INetwork, "id"|"chainId"|"type"|"block">)=>{
        setCreateLoading(true)
        try {

            const provider = new ethers.providers.JsonRpcProvider(data.rpc);
            const {chainId} = await provider.getNetwork()
            const {contractAddress:robotContractAddress} = await provider.getTransactionReceipt(data.robot);
            const {contractAddress:erc721FactoryContractAddress} = await provider.getTransactionReceipt(data.erc721Factory);
            const {contractAddress:erc1155ContractAddress,blockNumber} = await provider.getTransactionReceipt(data.erc1155);
            await create({
                rpc:data.rpc,
                erc721Factory:erc721FactoryContractAddress,
                robot:robotContractAddress,
                erc1155:erc1155ContractAddress,
                salt:data.salt,
                chainId:chainId.toString(),
                block:blockNumber.toString(),
                type:1
            });
            setVisible(false)
            mutate().then()
        }catch (e:any) {
            message.error(e.message)
        }finally {
            setCreateLoading(false)

        }

    },[create, mutate])
    useEffect(()=>{
        reset()
    },[reset, visible])
    return <Stack direction={'column'} spacing={2}>
        <Box>
            <Stack direction={"row"}>
                <Typography variant={'h4'} fontWeight={"bold"}>List</Typography>
                <IconButton onClick={()=>mutate()}>
                    <Refresh/>
                </IconButton>
            </Stack>
            <Typography variant={'body2'}>all eth chain.</Typography>
        </Box>
        <Box>
            <Modal
                open={visible}
                title={"add eth chain"}
                maxWidth={false}
                onCancel={()=>setVisible(false)}
                onOk={handleSubmit(handleCreate)}
                loading={createLoading}
            >
                <Stack width={600} spacing={2} padding={2}>
                <TextField
                    {...register("rpc",{required:true,validate:validateRpc},)}

                    error={!!errors.rpc} label={'rpc'}
                    size={"small"}
                    helperText={rpcHelpText}
                />
                    <TextField
                        {...register("robot",{required:true,validate:validateHash})} size={"small"} helperText={'robot deployed hash'}
                        label="robot"
                        error={!!errors.robot}
                    />
                <TextField
                    {...register("erc721Factory",{required:true,validate:validateHash})} size={"small"} helperText={'erc721Factory deployed hash'}
                    label="erc721Factory"
                    error={!!errors.erc721Factory}
                />

                    <TextField
                        {...register("erc1155",{required:true,validate:validateHash})} size={"small"} helperText={'erc1155 deployed hash'}
                        label="erc1155"
                        error={!!errors.erc1155}
                    />
                    <TextField
                        {...register("salt",{required:true})} size={"small"} helperText={'salt'}
                        label="salt"
                        error={!!errors.salt}
                    />
                </Stack>
            </Modal>
            <Button variant={"contained"} onClick={()=>setVisible(true)}>add</Button>
        </Box>

        <Box height={400} width={600}>
            <DataGrid
                disableExtendRowFullWidth={true}
                rows={data||[]}
                columns={columns}
                getRowId={(row)=>row.id}
                hideFooterPagination={true}
                hideFooter={true}
            />
        </Box>

    </Stack>
}
export default Eth;
