import React, {HTMLAttributes, useCallback, useMemo} from "react";
import {Autocomplete, Box, Typography, TextField, Paper, Stack, IconButton, Button} from "@mui/material";
import {Refresh} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {useAddCategory} from "@/http/category";
import {message} from "@/lib/util";

interface IAdd {
    name:string,
    icon:string
}
const defaultAdd:IAdd = {
    name:'',
    icon:''
}
export const General:React.FC = ()=>{
    const {register, handleSubmit,  reset,formState:{errors}} = useForm<IAdd>({defaultValues: defaultAdd});
    const [add] = useAddCategory();
    const handleAdd = useCallback(async (data:IAdd)=>{
        const res = await add(data)
        if(res){
            message.success("add success")
        }
    },[add])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Add</Typography>
        <Typography variant={'body2'}>add category</Typography>
        <Stack marginTop={2} spacing={3} direction={"column"}>
            <Box  width={484}>
                <TextField label={'name'} fullWidth={true} {...register("name",{required:true})} error={!!errors.name}/>
            </Box>
            <Box  width={484}>
                <TextField label={'icon'} fullWidth={true} {...register("icon")}/>
            </Box>
            <Box>
                <Button variant={"contained"} size={"large"} onClick={handleSubmit(handleAdd)}>add</Button>
            </Box>
        </Stack>
    </Box>
}
export default General;
