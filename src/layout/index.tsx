import React, {PropsWithChildren, useEffect} from "react";
import {Box} from "@mui/material";
import Header from "@/components/header";

export const Layout:React.FC<PropsWithChildren<unknown>> = (props)=>{

    return <Box bgcolor={theme=>theme.palette.background.default} height={'100%'} width={'100%'} overflow={"auto"}>
        {props.children}
    </Box>
}
export default Layout
