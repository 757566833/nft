import React, {useCallback, useRef} from "react";
import {Modal} from "@/lib/react-component";
import {Stack, TextField} from "@mui/material";
import {useTrait} from "@/components/manage/context/trait";
import {useForm,Controller} from "react-hook-form";
import ImgCrop from "@/lib/react-component/img-crop";
import {upload} from "@/services/upload";
import {useAddTrait} from "@/http/trait";
interface add{
    name:string,
    url?:File
}
const defaultParam:add = {
    name:'',
    url:undefined
}
const AddTrait:React.FC = ()=>{
    const { register, control,handleSubmit, watch, formState: { errors },setValue } = useForm<add>({defaultValues:defaultParam});
    const file = watch("url")
    const [traitState,setTraitState ] = useTrait();
    const {addVisible,addAttributeId,addAttribute} = traitState
    const [addTrait] = useAddTrait()
    const cropRef = useRef<{ getBlob: () => Promise<Blob | undefined> | undefined; }>(null)


    const handleCloseAdd = useCallback(()=>{
        setTraitState({
            addVisible:false
        })
    },[setTraitState])
    const handleAdd = useCallback(async (data:add)=>{
        const blob = await cropRef.current?.getBlob()
        console.log(blob)

        if(blob&&addAttributeId){
            const objectURL = URL.createObjectURL(blob);
            const a = new Image()
            a.src = objectURL
            const loadList=[]
            loadList.push(new Promise<void>((res,rej)=>{
                a.onload = ()=>{
                    res();
                }
            }))
             await Promise.all(loadList)
            console.log(a.width)
            console.log(a.height)

            const type = blob.type
            const [,suffix] = type.split("/");
            const file = new File([blob],`file.${suffix}`)
            let formData = new FormData();
            formData.append('file', file);
            const url = await upload(formData)
            const res = await  addTrait({
                name:data.name,
                attributeId:addAttributeId,
                url
            })
            if(res){
                setTraitState({
                    addVisible:false
                })
            }

        }
    },[addAttributeId, addTrait, setTraitState])

    return  <Modal title={`add ${addAttribute} trait`} keepMounted={true} maxWidth={false} open={addVisible} onCancel={handleCloseAdd} onOk={handleSubmit(handleAdd)}>
        <Stack width={716} minHeight={716} padding={1} spacing={2}>
            <TextField fullWidth={true} label={'name'} {...register("name")}/>
            <Controller
                name="url"
                control={control}
                render={({ field ,fieldState}) => (
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
}
export default AddTrait
