import React from "react";
import {Box, Typography} from "@mui/material";

export const General:React.FC = ()=>{
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Chain</Typography>
        <Typography variant={'body2'}>Manage your chain list.</Typography>
    </Box>
}
export default General;
