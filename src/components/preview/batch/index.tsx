import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Box,
    Button,
    Stack,
    LinearProgress,
    TextField,
    FormHelperText, Typography, IconButton
} from "@mui/material";
import {generateImage, strToInt} from "@/utils";
import {usePreview} from "@/context/preview";
import {Modal} from "@/lib/react-component";
import {base642File, blob2File, message, uploadFormDataBuilder} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_COLLECTION, CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
import {ipfsUpload} from "@/services/upload";
import {GetErc721, GetRobot} from "@/contract";
import {useForm} from "react-hook-form";
import {ethers} from "ethers";
import {getFee} from "@/utils/fee";
import Provider from "@/instance/provider";
import {LoadingButton} from "@mui/lab";
import {ICollection} from "@/services/collection";
import {ROBOT_CONTRACT_ADDRESS} from "@/constant/contract";
import {Refresh} from "@mui/icons-material";
const {useLocalStorage} = LocalStorage

interface AddressForm {
    name:string
    description:string
    address:string
    index:number
}
const defaultParam:AddressForm = {
    name:'',
    description:'',
    address:'',
    index:0,
}

export const Batch: React.FC = () => {
    const [wallet] = useWallet();
    const {chainId,isEIP1559,address} = wallet
    const [preview] = usePreview();
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<AddressForm>({defaultValues: defaultParam});
    const [visible, setVisible] = useState(false);
    const [progress ,setProgress] = useState(0)
    const [isApprovedForAll,setIsApprovedForAll] = useState(false)
    const [currentContract] = useLocalStorage<Record<number, IContract|null>>(CURRENT_CONTRACT,{})
    const [currentCollection] = useLocalStorage<ICollection|null>(CURRENT_COLLECTION,null)
    const [loading,setLoading] = useState(false)
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    const [progressTotal,setProgressTotal] = useState(0)
    useEffect(()=>{
        setProgressTotal(preview.length*2+1)
    },[preview.length])
    const handleStart = useCallback(async (data:AddressForm)=>{

        const contractAddress = current?.address
        const provider = await Provider.getInstance()
        if(contractAddress&&provider&&chainId&&current?.address&&currentCollection?.id){


            setLoading(true)
            const addresses:string[] = []
            const tokenURIs:string[] = []
            const collectionIds:string[] = []
            for (let i = 0; i < preview.length; i++) {
                const nft = preview[i];
                if(nft){
                    const dataUrl = await generateImage(nft.map(item=>`${process.env.NEXT_PUBLIC_FILE}${item.url}`))
                    if(dataUrl){
                        const file = base642File(dataUrl,`${data.name.replaceAll('${index}',(i+data.index).toString())}.png`)
                        if(file){
                            const builder = new uploadFormDataBuilder()
                            const formData = builder.setFile(file).setFileName(file.name).setData("collection",currentCollection?.name).setData("name",file.name).build()
                            const res = await ipfsUpload(formData)
                            setProgress(i*2)
                            if(res){
                                const ipfsImage = `ipfs://${res.data}`
                                const json = {
                                    name:data.name,
                                    image:ipfsImage,
                                    description: data.description,
                                    attributes:nft.map((item)=>({
                                        trait_type:item.attributeName,
                                        value:item.traitName
                                    }))
                                }
                                const str = JSON.stringify(json)
                                const blob = new Blob([str],{type:"application/json"})
                                const [_name]=file.name.split(".")
                                const metaData = blob2File(blob,'json','application/json',`${_name}-metadata`)
                                const builder = new uploadFormDataBuilder()
                                const metaDataFormData = builder.setFile(metaData).setFileName(metaData.name).setData("collection",currentCollection?.name).setData("name",metaData.name).build()
                                const metaDataRes = await ipfsUpload(metaDataFormData)
                                setProgress(i*2+1)
                                if(metaDataRes){
                                    tokenURIs[i] = `ipfs://${metaDataRes.data}`
                                }
                            }
                        }
                    }
                }
                addresses[i] = data.address;
                collectionIds[i] = currentCollection.id.toString();
            }
            const robot = await  GetRobot(chainId);
            if(robot){

                try {
                    console.log(current.address,addresses,tokenURIs,collectionIds)
                    const gasLimit = await robot.estimateGas.batchMint721(current?.address,addresses,tokenURIs,collectionIds)
                    const fee = await getFee({
                        provider,
                        gasLimit,
                        isEIP1559,
                    })
                    await robot.batchMint721(current?.address,addresses,tokenURIs,collectionIds,fee)
                }catch (e:any) {
                    message.error(e.reason)
                }finally {
                    setProgress(progressTotal)
                }

            }

            setLoading(false)
        }
    },[chainId, current?.address, currentCollection?.id, currentCollection?.name, isEIP1559, preview, progressTotal])
    const handleCancel = useCallback(()=>{
       setVisible(false)
    },[])
    const handleDownload = useCallback(() => {
        setVisible(true)
    }, [])
    useEffect(()=>{
        if(address){
            setValue("address",address)
        }
    },[address, setValue])

    const getApprovedForAll = useCallback(async ()=>{
        if(current?.address&&chainId&&address){
            const NEXT_PUBLIC_ROBOT = ROBOT_CONTRACT_ADDRESS[chainId]
            if(NEXT_PUBLIC_ROBOT){
                const erc721 = await GetErc721(current?.address);
                if(erc721){
                    try {
                        setLoading(true)
                        const res = await erc721.isApprovedForAll(address,NEXT_PUBLIC_ROBOT)
                        setIsApprovedForAll(res)
                    }catch (e:any) {
                        message.error(e.reason)
                    }finally {
                        setLoading(false)
                    }

                }
            }

        }

    },[address, chainId, current?.address])
    const setApprovedForAll = useCallback(async ()=>{
        const provider = await Provider.getInstance()
        if(chainId&&provider&&current?.address){
            const NEXT_PUBLIC_ROBOT = ROBOT_CONTRACT_ADDRESS[chainId]
            const erc721 = await GetErc721(current?.address);
            if(erc721){
                try {
                    setLoading(true)
                    const gasLimit = await erc721.estimateGas.setApprovalForAll(NEXT_PUBLIC_ROBOT,true)
                    const fee = await  getFee({
                        provider,
                        gasLimit,
                        isEIP1559,
                    })
                    await erc721.setApprovalForAll(NEXT_PUBLIC_ROBOT,true,fee);
                }catch (e:any) {
                    message.error(e.reason)
                }finally {
                    setLoading(false)
                }
            }
        }

    },[chainId, current?.address, isEIP1559])
    useEffect(()=>{
        getApprovedForAll().then()
    },[getApprovedForAll, visible])
    const handleClick = useCallback(()=>{
       if(isApprovedForAll){
           handleSubmit(handleStart)();
       } else{
           setApprovedForAll().then()
       }
    },[handleStart, handleSubmit, isApprovedForAll, setApprovedForAll])
    return <>
        <Modal open={visible} title={<Stack direction={"row"} spacing={1} alignItems={"center"}><Typography>Batch Upload</Typography><IconButton onClick={getApprovedForAll}><Refresh/></IconButton></Stack>} maxWidth={false} noFooter={true}>
            <Stack spacing={2} width={480}>
               <Box>
                   <Typography variant={"h5"}>set name template</Typography>
                   <Typography variant={"caption"}>if you set &ldquo;{"nft${index}"}&ldquo;. it will be generate nft1,nft2,nft3....</Typography>
               </Box>
                <TextField {...register("name",{required:true,validate:(v)=>v.includes('${index}')})} error={!!errors.name} size={"small"} helperText={'nft template name'}/>
                <Box>
                    <Typography variant={"h5"}>set description template</Typography>
                    <Typography variant={"caption"}>if you set &ldquo;{"nft${index}"}&ldquo;. it will be generate nft1,nft2,nft3....</Typography>
                </Box>
                <TextField
                    {...register("description",)} size={"small"} helperText={'nft template description'}
                    label="description"
                    multiline
                    rows={4}
                />
                <Box>
                    <Typography variant={"h5"}>set offset index</Typography>
                    <Typography variant={"caption"}>set first index value </Typography>
                </Box>
                <TextField
                    {...register("index",{required:true,setValueAs:strToInt,valueAsNumber:true})}
                    size={"small"}
                    helperText={'offset'}
                    label="index"
                    error={!!errors.index}

                />

                <TextField {...register("address",{validate:ethers.utils.isAddress})} error={!!errors.address} size={"small"} helperText={'received address'}/>
                <LinearProgress  variant="determinate" value={progress/progressTotal*100}/>
                <Stack spacing={2}>
                    <LoadingButton fullWidth={true} variant={"contained"} disabled={current?.owner!=address} loading={loading} onClick={handleClick}>{isApprovedForAll?"start":"approved For All"}</LoadingButton>
                    {current?.owner!=address&&<FormHelperText error={true}>contract ownerOf {current?.owner}</FormHelperText>}

                    <Button variant={"contained"} onClick={handleCancel}>cancel</Button>
                </Stack>
            </Stack>
        </Modal>
       <Box hidden={preview.length==0}>
           <Button variant={'contained'} fullWidth={true} onClick={handleDownload}>batch upload</Button>
       </Box>
    </>
}
export default Batch;
