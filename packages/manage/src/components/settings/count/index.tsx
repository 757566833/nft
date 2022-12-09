import React, {ChangeEvent, useCallback} from "react";
import {Box, Typography,TextField} from "@mui/material";
import {LocalStorage} from "@/lib/react-context";
import {PREVIEW_COUNT} from "@/constant";
const {useLocalStorage} = LocalStorage

export const Count:React.FC = ()=>{
    const [count,setCount] = useLocalStorage<string>(PREVIEW_COUNT,"100")
    const handleChange = useCallback((e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const value  = Number.parseInt(e.target.value)
        setCount(value>999999999?"999999999":value.toString())
    },[setCount])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Count</Typography>
        <Typography variant={'body2'}>Preview Count, max 999999999</Typography>
        <TextField value={count} onChange={handleChange} type={"number"}/>
    </Box>
}
export default Count;
