import React, {useCallback, useState} from "react";
import {Box, Button, Menu, MenuItem, Stack, Typography} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Add from "@/components/manage/add";
import {useAttributes} from "@/http";
import {Dropdown} from "@/lib/react-component";
import Attributes from "@/components/manage/attributes";

const Manage: React.FC = () => {
    const {data, error, isValidating, mutate} = useAttributes()
    const [visible, setVisible] = useState(false)
    return <Box marginTop={2}>
        <Box width={1000} margin={'0 auto'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={2}>
                <Typography fontWeight={"bold"} variant={'h3'}>Attributes</Typography>
                <Stack direction={"row"} spacing={1} height={40}>
                    <Add/>
                    <Button variant={"outlined"}>
                        upload assets
                    </Button>
                </Stack>
            </Box>
            <Attributes list={data} loading={isValidating}/>
        </Box>
    </Box>
}
export default Manage;
