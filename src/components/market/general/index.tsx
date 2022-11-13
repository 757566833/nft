import React from "react";
import {Box, Typography} from "@mui/material";

export const General:React.FC = ()=>{
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>General</Typography>
        <Typography variant={'body2'}>Manage your market settings.</Typography>
    </Box>
}
export default General;
