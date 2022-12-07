import React, {PropsWithChildren} from "react";
import {Box} from "@mui/material";

export const Layout:React.FC<PropsWithChildren> = (props)=>{

    return <Box bgcolor={theme=>theme.palette.background.default} height={'100%'} width={'100%'} overflow={"auto"} >
        {props.children}
    </Box>
}
export default Layout
