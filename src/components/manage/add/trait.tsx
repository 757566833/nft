import React, {useCallback, useRef} from "react";
import {Modal} from "@/lib/react-component";
import {Stack, TextField} from "@mui/material";
import {useTrait} from "@/components/manage/context/trait";
import {useForm,Controller} from "react-hook-form";
import ImgCrop from "@/lib/react-component/img-crop";
import {upload} from "@/services/upload";
import {addTrait} from "@/services";
interface add{
    name:string,
    url?:File
}
const defaultParam:add = {
    name:'',
    url:undefined
}
const AddTrait:React.FC = ()=>{
    const { register, control,handleSubmit, watch, formState: { errors },reset } = useForm<add>({defaultValues:defaultParam});
    const file = watch("url")
    const cropRef = useRef<{ getBlob: () => Promise<Blob | undefined> | undefined; }>(null)
    const [traitState,setTraitState ] = useTrait();
    const {addVisible,addAttributeId,addAttribute} = traitState
    const handleCloseAdd = useCallback(()=>{
        setTraitState({
            addVisible:false
        })
    },[setTraitState])
    const handleAdd = useCallback(async (data:add)=>{
        const blob = await cropRef.current?.getBlob()
        if(blob&&addAttributeId){
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
    },[addAttributeId, setTraitState])

    return  <Modal title={`add ${addAttribute} trait`} keepMounted={true} open={addVisible} onCancel={handleCloseAdd} onOk={handleSubmit(handleAdd)}>
        <Stack width={280} padding={1} spacing={2}>
            <TextField fullWidth={true} label={'name'} {...register("name")}/>
            <Controller
                name="url"
                control={control}
                render={({ field }) => (
                    <input
                        type="file"
                        onChange={e => {
                            field.onChange(e.target.files?.[e.target.files?.length-1]);
                        }}
                    />
                )}
            />
            <ImgCrop ref={cropRef} file={file} aspect={600/600}/>
        </Stack>

    </Modal>
}
export default AddTrait
