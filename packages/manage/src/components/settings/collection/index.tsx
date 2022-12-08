import React, {HTMLAttributes, useCallback, useMemo} from "react";
import {Autocomplete, Box, Typography, TextField, Paper, Stack, IconButton} from "@mui/material";
import {LocalStorage} from "@/lib/react-context";
import {CURRENT_COLLECTION, CURRENT_CONTRACT} from "@/constant";
import {AutocompleteRenderInputParams} from "@mui/material/Autocomplete/Autocomplete";
import {Refresh} from "@mui/icons-material";
import {useCollections} from "@/http/collection";
import {ICollection} from "@/services/collection";
const {useLocalStorage} = LocalStorage



const renderOption = (props:React.HTMLAttributes<HTMLLIElement>, option:ICollection) => {
    return (
        <li {...props} key={option.id}>
            {option.name}
        </li>
    );
}
const CustomPaper = (props:HTMLAttributes<HTMLElement>) => {
    return <Paper elevation={0} variant={"outlined"} {...props} />;
};
const  isOptionEqualToValue=(r:ICollection,v:ICollection)=>r.id==v.id
const renderInput = (params:AutocompleteRenderInputParams) => <TextField {...params} label="contract" />
export const General:React.FC = ()=>{
    const {data, isValidating, mutate} = useCollections()
    const [currentCollection,setCurrentCollection] = useLocalStorage<ICollection|null>(CURRENT_COLLECTION,null)
    const options = useMemo(()=>{
        return data||[]
    },[data])
    const handleChange = useCallback((event: React.SyntheticEvent,
                                      value: ICollection|null)=>{
        setCurrentCollection(value)

    },[setCurrentCollection])
    const handleRefresh = useCallback(()=>{
        mutate().then()
    },[mutate])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Collection</Typography>
        <Stack marginTop={2} spacing={3} direction={"row"}  alignItems={"center"}>
            <Box  width={484}>
                <Autocomplete
                    disablePortal
                    loading={isValidating}
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.name}
                    options={options}
                    onChange={handleChange}
                    value={currentCollection}
                    renderOption={renderOption}
                    PaperComponent={CustomPaper}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderInput={renderInput}
                />
            </Box>
            <Box>
                <IconButton onClick={handleRefresh}>
                    <Refresh/>
                </IconButton>
            </Box>
        </Stack>
    </Box>
}
export default General;
