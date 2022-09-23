import React from "react";
import {Box, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {Dropdown} from "@/lib/react-component";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IAttribute} from "@/services";

const render = (item:IAttribute)=>{
    return <Box key={item.id} padding={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant={"h5"} fontWeight={'500'}>{item.name}</Typography>
            <Dropdown overlay={<Menu open={true}>
                <MenuItem>
                    <Stack direction={"row"} spacing={1}>
                        <ControlPointOutlinedIcon/> <Typography>Add traits</Typography>
                    </Stack>
                </MenuItem>

                <MenuItem>
                    <Stack direction={"row"} spacing={1}>
                        <EditOutlinedIcon/> <Typography>Edit Attribute</Typography>
                    </Stack>
                </MenuItem>

                <MenuItem>
                    <Stack direction={"row"} spacing={1}>
                        <DeleteOutlineOutlinedIcon/> <Typography>Delete</Typography>
                    </Stack>
                </MenuItem>
            </Menu>}>
                <MoreHorizIcon/>
            </Dropdown>
        </Stack>
        <Box>
            list
        </Box>
    </Box>
}

export const Attributes:React.FC<{list?:IAttribute[],loading?:boolean}> = (props)=>{
    const {list} = props
    return <Box>
        {list?.map(render)}
    </Box>
}
export default Attributes;
