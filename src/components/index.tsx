import React, {useState} from "react";
import {Box} from "@mui/material";
import Header from "@/components/header";
import Preview from "@/components/preview";
import Manage from "@/components/manage";

export const Index:React.FC = ()=>{
    const [active,setActive] = useState("manage");
    return <Box>
        <Header value={active} onChange={setActive}/>
        <Box hidden={active!='preview'}>
            <Preview/>
        </Box>
        <Box hidden={active!='manage'}>
            <Manage />
        </Box>
    </Box>
}
export default Index
