import React, {useCallback, useMemo} from "react";
import {Box, Button, Divider, Stack, Toolbar, AppBar} from "@mui/material";
import {Tabs, Tab} from '@mui/material';
import {Phone, Favorite, PersonPin, PhoneMissed} from '@mui/icons-material';
import {useRouter} from "next/router";
import {useClintNavigation} from "@/hook/navigation";
import {Action} from "@/components/header/nav/action";

export const Nav: React.FC = () => {
    const router = useRouter();
    const [navigation] = useClintNavigation();
    const handleChange = useCallback((_e: any, value: string) => {
        if (!router.asPath.startsWith(`/${value}`)) {
            navigation.push(`/${value}`).then()
        }
    }, [navigation, router.asPath])
    const _value = useMemo(() => {
        const arr = router.asPath.split('/');
        return arr[1]
    }, [router.asPath])
    return <Box position={"sticky"} justifyContent={"space-between"} display={"flex"} alignItems={"center"}>
        <Box flex={1} textAlign={"left"}>nft</Box>
        <Box width={1000}>
            <Tabs
                value={_value}
                onChange={handleChange}
                aria-label="icon position tabs example"
            >
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><Phone/><Box>Preview</Box></Stack>} value={"preview"}/>
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><PhoneMissed/><Box>Manage</Box></Stack>} value={"manage"}/>
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><Favorite/><Box>Settings</Box></Stack>} value={"settings"}/>
                <Tab  iconPosition="start" label={<Stack direction={"row"} alignItems={"center"} spacing={1} ><PersonPin/><Box>Generate</Box></Stack>} value={"generate"}/>
            </Tabs>
        </Box>
        <Box flex={1} textAlign={"right"}>
            <Action/>
        </Box>



    </Box>
}
export default React.memo(Nav)
