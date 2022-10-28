import React, {useCallback} from 'react'
import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {Action} from "@/components/header/action";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {useWallet} from "@/context/wallet";
import {LocalStorage} from "@/lib/react-context";
const {useLocalStorage} = LocalStorage

const Header:React.FC<{value:string,onChange:(value: string)=>void}> = (props)=>{
    const {value,onChange} = props;
    const [wallet] = useWallet()
    const {chainId} = wallet
    const handleChange = useCallback((_e: any, value: string) => {
        onChange(value)
    }, [onChange])
    const [currentContract] = useLocalStorage<Record<number, IContract|null>>(CURRENT_CONTRACT,{})
    return <Box position={"sticky"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} borderBottom={1} borderColor={'#888888'}>
        <Box flex={1} textAlign={"left"}>
            <Box paddingLeft={1}>
                <Typography>
                    {currentContract[chainId||0]?.address||''}
                </Typography>
            </Box>

        </Box>
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
