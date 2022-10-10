import React, {useCallback} from 'react'
import {Box, Stack, Tab, Tabs} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {Action} from "@/components/header/action";

const Header:React.FC<{value:string,onChange:(value: string)=>void}> = (props)=>{
    const {value,onChange} = props;
    const handleChange = useCallback((_e: any, value: string) => {
        onChange(value)
    }, [onChange])
    return <Box position={"sticky"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} borderBottom={1} borderColor={'#888888'}>
        <Box flex={1} textAlign={"left"}>nft</Box>
        <Box width={1000}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon position tabs example"
            >
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><RemoveRedEyeOutlinedIcon/><Box>Preview</Box></Stack>} value={"preview"}/>
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><ColorLensOutlinedIcon/><Box>Manage</Box></Stack>} value={"manage"}/>
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><SettingsOutlinedIcon/><Box>Settings</Box></Stack>} value={"settings"}/>
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><ImageOutlinedIcon/><Box>Generate</Box></Stack>} value={"generate"}/>
            </Tabs>
        </Box>
        <Box flex={1} textAlign={"right"}>
            <Action/>
        </Box>
    </Box>
}
export default React.memo(Header);
