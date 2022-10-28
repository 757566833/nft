import React, {ChangeEvent, HTMLAttributes, useCallback, useEffect, useMemo} from "react";
import {Autocomplete, Box, Typography,TextField,Paper} from "@mui/material";
import {useWallet} from "@/context/wallet";
import {useContracts} from "@/http/contract";
import {LocalStorage} from "@/lib/react-context";
import {CURRENT_CONTRACT, PREVIEW_COUNT} from "@/constant";
const {useLocalStorage} = LocalStorage

export const Count:React.FC = ()=>{
    const [count,setCount] = useLocalStorage<string>(PREVIEW_COUNT,"100")
    const handleChange = useCallback((e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const value  = Number.parseInt(e.target.value)
        setCount(value>1024?"1024":value.toString())
    },[setCount])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Count</Typography>
        <Typography variant={'body2'}>Preview Count, max 1024</Typography>
        <TextField value={count} onChange={handleChange} type={"number"}/>
    </Box>
}
export default Count;
