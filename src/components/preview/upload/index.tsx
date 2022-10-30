import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Box, Button, Stack, Typography, CircularProgress, LinearProgress, TextField} from "@mui/material";
import {generateImage} from "@/utils";
import {usePreview} from "@/context/preview";
import {Modal} from "@/lib/react-component";
import {base642File, blob2File, message, uploadFormDataBuilder} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
import {ipfsUpload} from "@/services/upload";
import {GetErc721} from "@/contract";
import {useForm} from "react-hook-form";
import {ethers} from "ethers";
import {getFee, guessEIP1559Fee} from "@/utils/fee";
import Provider from "@/instance/provider";
const {useLocalStorage} = LocalStorage

interface AddressForm {
    address:string
}
const defaultParam = {
    address:''
}

export const Upload: React.FC = () => {
    const [wallet] = useWallet();
    const {chainId,isEIP1559,address} = wallet
    const [preview] = usePreview();
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<AddressForm>({defaultValues: defaultParam});
    const [visible, setVisible] = useState(false);
    const [index,setIndex] = useState(0);
    const [progress ,setProgress] = useState(0)
    const [currentContract] = useLocalStorage<Record<number, IContract|null>>(CURRENT_CONTRACT,{})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    const [finish,setFinish] = useState(false)
    const handleNext = useCallback(()=>{
        setIndex(index+1)
        setFinish(false)
        setProgress(0)
    },[index])
    const handleStart = useCallback(async (data:AddressForm)=>{
        const contractAddress = current?.address
        const provider = await Provider.getInstance()
        if(contractAddress&&provider){
            const nft = preview[index];
            if(nft){
                const dataUrl = await generateImage(nft.map(item=>`${process.env.NEXT_PUBLIC_FILE}${item.url}`))
                if(dataUrl){
                    const file = base642File(dataUrl,`${current?.name}${index}.png`)
                    if(file){
                        const builder = new uploadFormDataBuilder()
                        const formData = builder.setFile(file).setFileName(file.name).build()
                        const res = await ipfsUpload(formData)
                        setProgress(25)
                        if(res){
                            const [name] = file.name.split('.')
                            const ipfsImage = `ipfs://${res.data}`
                            const json = {
                                name:name,
                                image:ipfsImage,
                                description: "",
                                attributes:nft.map((item)=>({
                                    trait_type:item.attributeName,
                                    value:item.traitName
                                }))
                            }
                            const str = JSON.stringify(json)
                            const blob = new Blob([str],{type:"application/json"})
                            const metaData = blob2File(blob,'json','application/json','file.json')
                            const builder = new uploadFormDataBuilder()
                            const metaDataFormData = builder.setFile(metaData).setFileName(metaData.name).build()
                            const metaDataRes = await ipfsUpload(metaDataFormData)
                            if(metaDataRes){
                                setProgress(50)
                                try {
                                    const contract = await GetErc721(contractAddress)
                                    if(contract){
                                        const gas = await contract.estimateGas.mint(data.address, metaDataRes.data)
                                        const fee = await getFee({
                                            provider,
                                            gasLimit:gas,
                                            isEIP1559
                                        })
                                        await contract.mint(data.address, metaDataRes.data,fee);
                                        setProgress(100)
                                        setFinish(true)
                                    }
                                }catch (e:any) {
                                    setProgress(0)
                                    message.error(e.reason)
                                }


                            }

                        }


                    }

                }
            }

        }
    },[current?.address, current?.name, index, isEIP1559, preview])
    const handleCancel = useCallback(()=>{
       setVisible(false)
    },[])
    const handleDownload = useCallback(() => {
        setVisible(true)
    }, [])
    useEffect(()=>{
        setIndex(0)
    },[preview.length])
    useEffect(()=>{
        if(address){
            setValue("address",address)
        }

    },[address, setValue])
    return <>
        <Modal open={visible} title={`Upload ${current?.name} ${index}`} maxWidth={false} noFooter={true}>
            <Stack spacing={2}>
                <Box width={480} height={480} position={"relative"}>
                    {preview[index]?.map((item, index) => {
                        return <Box key={index} width={480} height={480} position={"absolute"}
                                    zIndex={item.zIndex}
                                    component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
                    })}
                </Box>
                <TextField {...register("address",{validate:ethers.utils.isAddress})} error={!!errors.address} size={"small"} helperText={'received address'}/>
                <LinearProgress  variant="determinate" value={progress}/>
                <Stack spacing={2}>
                    {!finish&&<Button fullWidth={true} variant={"contained"} onClick={handleSubmit(handleStart)}>start</Button>}
                    {finish&&<Button fullWidth={true} variant={"contained"} onClick={handleNext}>next</Button>}

                    <Button variant={"contained"} onClick={handleCancel}>cancel</Button>
                </Stack>
            </Stack>
        </Modal>
       <Box hidden={preview.length==0}>
           <Button variant={'contained'} fullWidth={true} onClick={handleDownload}>upload</Button>
       </Box>
    </>
}
export default Upload;
