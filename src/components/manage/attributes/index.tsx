import React, {Key, useCallback} from "react";
import {Box, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {Dropdown} from "@/lib/react-component";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IAttribute} from "@/services";
import {useTrait} from "@/components/manage/context/trait";



export const Attributes:React.FC<{list?:IAttribute[],loading?:boolean}> = (props)=>{
    const {list} = props
    const [,setAddTraitState] = useTrait();
    const handleAdd = useCallback((id:number,name:string)=>{
        setAddTraitState({
            addVisible:true,
            addAttribute:name,
            addAttributeId:id
        })
    },[setAddTraitState])

    const render =useCallback( (item:IAttribute)=>{
        const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>,key?: Key | null | undefined)=>{
            switch (key){
                case "add":
                    handleAdd(item.id,item.name)
                    break
            }
        }
        return <Box key={item.id} padding={2}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography variant={"h5"} fontWeight={'500'}>{item.name}</Typography>
                <Dropdown onClick={handleClick} overlay={<Menu open={true}>
                    <MenuItem key={'add'} data-name={item.name} data-id={item.id}>
                        <Stack direction={"row"} spacing={1}>
                            <ControlPointOutlinedIcon/> <Typography>Add traits</Typography>
                        </Stack>
                    </MenuItem>

                    <MenuItem  key={'edit'}>
                        <Stack direction={"row"} spacing={1}>
                            <EditOutlinedIcon/> <Typography>Edit Attribute</Typography>
                        </Stack>
                    </MenuItem>

                    <MenuItem  key={'delete'}>
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
    },[handleAdd])
    return <Box>
        {list?.map(render)}
    </Box>
}
export default Attributes;
