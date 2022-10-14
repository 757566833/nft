import React, {useState} from "react";
import {Box} from "@mui/material";
import Header from "@/components/header";
import Preview from "@/components/preview";
import Manage from "@/components/manage";
import Settings from "@/components/settings";
import Generate from "@/components/generate";

export const Index:React.FC = ()=>{
    const [active,setActive] = useState("manage");
    console.log(active)
    return <Box>
        <Header value={active} onChange={setActive}/>
        <Box hidden={active!='preview'}>
            <Preview/>
        </Box>
        <Box hidden={active!='manage'}>
            <Manage />
        </Box>
        <Box hidden={active!='settings'}>
            <Settings />
        </Box>
        <Box hidden={active!='generate'}>
            <Generate />
        </Box>
    </Box>
}
export default Index
