import React, {useCallback, useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import useSWR from "swr";
import {fetcher} from "@/services";
import Add from "@/components/manage/add";
import {useAttributes} from "@/http";

const Manage:React.FC = ()=>{
    const {data,error,isValidating,mutate} = useAttributes()
    const [visible,setVisible]= useState(false)
    return <Box marginTop={2}>
        <Box width={1000} margin={'0 auto'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography fontWeight={"bold"} variant={'h3'}>Attributes</Typography>
                <Stack direction={"row"} spacing={1} height={40} >
                   <Add/>
                    <Button variant={"outlined"}>
                        upload assets
                    </Button>
                </Stack>
            </Box>
        </Box>
    </Box>
}
export default Manage;
