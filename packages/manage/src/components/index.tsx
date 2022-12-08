import React, {useState} from "react";
import {Box} from "@mui/material";
import Header from "@/components/header";
import Preview from "@/components/preview";
import Manage from "@/components/manage";
import Settings from "@/components/settings";
import Generate from "@/components/generate";
import Market from "@/components/market";

export const Index:React.FC = ()=>{
    const [active,setActive] = useState("manage");
    return <Box height={'100%'} display={"flex"} flexDirection={"column"}>
        <Header value={active} onChange={setActive}/>
        <Box hidden={active!='preview'} flex={1}>
            <Preview/>
        </Box>
        <Box hidden={active!='manage'} flex={1}>
            <Manage />
        </Box>
        <Box hidden={active!='settings'} flex={1}>
            <Settings />
        </Box>
        <Box hidden={active!='generate'} flex={1}>
            <Generate />
        </Box>
        <Box hidden={active!='market'} flex={1}>
            <Market />
        </Box>
    </Box>
}
export default Index
