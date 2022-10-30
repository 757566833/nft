import React, {HTMLAttributes, useCallback, useEffect, useMemo} from "react";
import {Autocomplete, Box, Typography,TextField,Paper} from "@mui/material";
import {useWallet} from "@/context/wallet";
import {useContracts} from "@/http/contract";
import {useAttributes} from "@/http/attribute";
import {AutocompleteValue} from "@mui/base/AutocompleteUnstyled/useAutocomplete";
import {IContract} from "@/services/contract";
import {LocalStorage} from "@/lib/react-context";
import {CURRENT_CONTRACT} from "@/constant";
import {AutocompleteRenderInputParams} from "@mui/material/Autocomplete/Autocomplete";
const {useLocalStorage} = LocalStorage



const renderOption = (props:React.HTMLAttributes<HTMLLIElement>, option:IContract) => {
    return (
        <li {...props} key={option.address}>
            {option.name}
        </li>
    );
}
const CustomPaper = (props:HTMLAttributes<HTMLElement>) => {
    return <Paper elevation={0} variant={"outlined"} {...props} />;
};
const  isOptionEqualToValue=(r:IContract,v:IContract)=>r.address==v.address
const renderInput = (params:AutocompleteRenderInputParams) => <TextField {...params} label="contract" />
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
        if(options.length==0){
            return  null
        }
        if(typeof chainId=="number"){
            return currentContract[chainId]||null
        }
        return null
    },[chainId, currentContract, options.length])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Contract</Typography>
        <Typography variant={'body2'}>select contract where chainId is {chainId}</Typography>
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
                PaperComponent={CustomPaper}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={renderInput}
            />
        </Box>
    </Box>
}
export default General;
