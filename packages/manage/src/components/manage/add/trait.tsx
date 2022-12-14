import React, {useCallback, useMemo, useRef} from "react";
import {Modal} from "@/lib/react-component";
import {Box, Stack, TextField, Typography} from "@mui/material";
import {useTrait} from "@/components/manage/context/trait";
import {useForm,Controller} from "react-hook-form";
import ImgCrop from "@/lib/react-component/img-crop";
import {upload} from "@/services/upload";
import {useAddTrait} from "@/http/trait";
import {message} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
const {useLocalStorage} = LocalStorage
interface add{
    name:string,
    url?:File
}
const defaultParam:add = {
    name:'',
    url:undefined
}
const AddTrait:React.FC = ()=>{
    const [wallet] = useWallet()
    const {chainId} = wallet;
    const { register, control,handleSubmit, watch, setValue } = useForm<add>({defaultValues:defaultParam});
    const file = watch("url")
    const [traitState,setTraitState ] = useTrait();
    const {addVisible,addAttributeId,addAttribute,type} = traitState
    const [addTrait] = useAddTrait()
    const cropRef = useRef<{ getBlob: () => Promise<Blob | undefined> | undefined; }>(null)
    const [currentContract] = useLocalStorage<Record<number, IContract|null>>(CURRENT_CONTRACT,{})

    const handleCloseAdd = useCallback(()=>{
        setTraitState({
            addVisible:false
        })
    },[setTraitState])
    const handleAdd = useCallback(async (data:add)=>{
        const blob = await cropRef.current?.getBlob()

        if(blob&&addAttributeId&&chainId){
            const objectURL = URL.createObjectURL(blob);
            const a = new Image()
            a.src = objectURL
            const loadList=[]
            loadList.push(new Promise<void>((res)=>{
                a.onload = ()=>{
                    res();
                }
            }))
             await Promise.all(loadList)

            const type = blob.type
            const [,suffix] = type.split("/");
            const file = new File([blob],`file.${suffix}`)
            let formData = new FormData();
            formData.append('file', file);
            const url = await upload(formData)
            const res = await  addTrait({
                name:data.name,
                attributeId:addAttributeId,
                url,
                chainId:chainId.toString(),
                contract:currentContract[chainId||0]?.address||''
            })
            if(res){
                setTraitState({
                    addVisible:false
                })
            }

        }
    },[addAttributeId, addTrait, chainId, currentContract, setTraitState])
    const singleVisible = useMemo(()=>{
        return addVisible&&type=="single"
    },[addVisible, type])
    const batchVisible = useMemo(()=>{
        return addVisible&&type=="batch"
    },[addVisible, type])
    const handlePreventDefault = useCallback((event:React.DragEvent<HTMLDivElement>)=>{
        event.preventDefault()
    },[])
    const handleDrop = useCallback(async (event:React.DragEvent<HTMLDivElement>)=>{
        event.preventDefault()
       if(typeof addAttributeId=="number"&&chainId){
           const {items} = event.dataTransfer
           if(items.length>1||items.length==0){
               message.error("only one dir")
               return
           }
           const item = items[0];

           const entry = item.webkitGetAsEntry()
           let dir :FileSystemDirectoryEntry
           if(!entry?.isDirectory){
               message.error("must be dir")
               return
           }
           dir = entry as FileSystemDirectoryEntry
           const reader = dir.createReader()
           const files:File[] = await new Promise((resolve, reject) =>
               reader.readEntries((entries) => {
                   // ????????????????????????????????????????????????????????????
                   const fileEntries = entries.filter((entry) => entry.isFile) as FileSystemFileEntry[]
                   const filesPromise:Promise<File>[] = fileEntries.map((entry) => new Promise((resolve) => entry.file((file) => resolve(file))))
                   Promise.all(filesPromise).then(resolve)
               }, reject)
           )

           const filesUpload = files.map((file)=>{
               let formData = new FormData();
               formData.append('file', file);
               const [name] = file.name.split(".")
               return upload(formData).then(url=>addTrait({
                   name:name,
                   attributeId:addAttributeId,
                   url,
                   chainId:chainId.toString(),
                   contract:currentContract[chainId||0]?.address||''
               }))
           })
           Promise.all(filesUpload).then()

       }
        // for (let i = 0; i < items.length; i++) {
        //     // console.log(items[i])
        //     // console.log(items[i].getAsFile())
        //     const file = items[i].webkitGetAsEntry()
        //    // console.log(file)
        // }
    },[addAttributeId, addTrait, chainId, currentContract])
    return  <><Modal title={`add ${addAttribute} trait`} keepMounted={true} maxWidth={false} open={singleVisible} onCancel={handleCloseAdd} onOk={handleSubmit(handleAdd)}>
        <Stack width={716} minHeight={716} padding={1} spacing={2}>
            <TextField fullWidth={true} label={'name'} {...register("name")}/>
            <Controller
                name="url"
                control={control}
                render={({ field }) => (
                    <input
                        type="file"
                        onChange={e => {
                            const files = e.target.files
                            const file = files?.[files?.length-1]
                            if(file){
                                field.onChange(file);
                                const [name] = file.name.split('.')
                                setValue("name",name)
                            }

                        }}
                    />
                )}
            />
            <ImgCrop ref={cropRef} file={file} aspect={600/600}/>
        </Stack>

    </Modal>
        <Modal noFooter={true}  onClose={handleCloseAdd} title={`add ${addAttribute} trait`} keepMounted={true} maxWidth={false} open={batchVisible}>
            <Stack
                direction={"column"}
                spacing={3}
                justifyContent={"center"}
                alignItems={"center"}
                lineHeight={'240px'}
                textAlign={"center"}
                width={480}
                minHeight={240}
                border={(theme)=>`solid 1px ${theme.palette.primary.dark}`}
                borderRadius={5}
                onDrop={handleDrop}
                onDragEnter={handlePreventDefault}
                onDragOver={handlePreventDefault}
                onDragLeave={handlePreventDefault}
            >
                <Box>
                    <Typography variant={'h4'}>drop dir and upload</Typography>
                </Box>
                <Box>
                    <Typography variant={"body1"}>Make sure the resolution is 600 * 600</Typography>
                </Box>
            </Stack>
        </Modal>
        </>
}
export default AddTrait
