import React, {useCallback, useEffect, useMemo} from "react";
import {Autocomplete, Box, Typography,TextField} from "@mui/material";
import {useWallet} from "@/context/wallet";
import {useContracts} from "@/http/contract";
import {useAttributes} from "@/http/attribute";
import {AutocompleteValue} from "@mui/base/AutocompleteUnstyled/useAutocomplete";
import {IContract} from "@/services/contract";
import {LocalStorage} from "@/lib/react-context";
import {CURRENT_CONTRACT} from "@/constant";
const {useLocalStorage} = LocalStorage



const renderOption = (props:React.HTMLAttributes<HTMLLIElement>, option:IContract) => {
    return (
        <li {...props} key={option.address}>
            {option.name}
        </li>
    );
}
export const General:React.FC = ()=>{
    const [wallet] = useWallet();
    const {chainId} = wallet;
    const {data, error, isValidating, mutate} = useContracts(chainId)
    const [currentContract,setCurrentContract] = useLocalStorage<Record<number, IContract|null>>(CURRENT_CONTRACT,{})
    const options = useMemo(()=>{
        return data||[]
    },[data])

    const handleChange = useCallback((event: React.SyntheticEvent,
                                      value: IContract|null)=>{
        setCurrentContract({
            ...currentContract,
            [`${chainId}`]:value
        })

    },[chainId, currentContract, setCurrentContract])
    const current = useMemo(()=>{
        if(typeof chainId=="number"){
            return currentContract[chainId]
        }
        return null
    },[chainId, currentContract])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Contract</Typography>
        <Typography variant={'body2'}>select contract in current chain</Typography>
        <Box marginTop={2} width={484}>
            <Autocomplete
                disablePortal
                loading={isValidating}
                id="combo-box-demo"
                getOptionLabel={(option) => option.name}
                options={options}
                onChange={handleChange}
                value={current}
                renderOption={renderOption}
                renderInput={(params) => <TextField {...params} label="contract" />}
            />
        </Box>
    </Box>
}
export default General;
