import React, {useCallback, useRef} from "react";
import {Modal} from "@/lib/react-component";
import {Stack, TextField} from "@mui/material";
import {useTrait} from "@/components/manage/context/trait";
import {useForm,Controller} from "react-hook-form";
import ImgCrop from "@/lib/react-component/img-crop";
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
    const [traitState,setTraitState ] = useTrait();
    const {addVisible,addAttributeId,addAttribute} = traitState
    const handleCloseAdd = useCallback(()=>{
        setTraitState({
            addVisible:false
        })
    },[setTraitState])
    const handleAdd = useCallback((data:add)=>{
        console.log(data)
    },[])
    const cropRef = useRef<{ getBlob: () => Promise<Blob | undefined> | undefined; }>(null)
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
