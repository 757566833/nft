import React, {ForwardRefRenderFunction, Key, useCallback, useImperativeHandle, useRef, useState} from "react";
import {Box, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {Dropdown} from "@/lib/react-component";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IAttribute} from "@/services/attribute";
import {useTrait} from "@/components/manage/context/trait";
import Traits, {TraitsRef, TraitsRefValue} from "@/components/manage/traits";
import EditAttribute from "@/components/manage/edit/attribute";
export type AttributesRefValue = {attributeId:number, name: string; zIndex: number; traits?: TraitsRefValue }[]
export interface AttributesProps{ list?: IAttribute[], loading?: boolean }
export interface AttributesRef{getValue: () => AttributesRefValue}
const Attributes: React.ForwardRefRenderFunction<AttributesRef,AttributesProps> = (props,ref) => {
    const {list} = props
    const [, setAddTraitState] = useTrait();
    const [editVisible, setEditVisible] = useState(false)
    const [editId, setEditId] = useState<number | undefined>();
    const handleAdd = useCallback((id: number, name: string) => {
        setAddTraitState({
            addVisible: true,
            addAttribute: name,
            addAttributeId: id
        })
    }, [setAddTraitState])

    const traitsRef = useRef<(TraitsRef|null)[]>([])

    const render = useCallback((item: IAttribute,index:number) => {
        const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key?: Key | null | undefined) => {
            switch (key) {
                case "add":
                    handleAdd(item.id, item.name)
                    break
                case "edit":
                    setEditId(item.id)
                    setEditVisible(true)
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

                    <MenuItem key={'edit'}>
                        <Stack direction={"row"} spacing={1}>
                            <EditOutlinedIcon/> <Typography>Edit Attribute</Typography>
                        </Stack>
                    </MenuItem>

                    <MenuItem key={'delete'}>
                        <Stack direction={"row"} spacing={1}>
                            <DeleteOutlineOutlinedIcon/> <Typography>Delete</Typography>
                        </Stack>
                    </MenuItem>
                </Menu>}>
                    <MoreHorizIcon/>
                </Dropdown>
                <Typography variant={"body1"} color={'#5e727f'}>{item.count} traits</Typography>
            </Stack>
            <Box>
                <Traits ref={e=>traitsRef.current[index] = e} attributeId={item.id} total={item.count}/>
            </Box>
        </Box>
    }, [handleAdd])
    const handleEditFinish = useCallback(() => {
        setEditId(undefined)
        setEditVisible(false)
    }, [])
    const handleEditCancel = useCallback(() => {
        setEditId(undefined)
        setEditVisible(false)
    }, [])
    const getValue = useCallback(()=>{
        const value : AttributesRefValue = []
        if(!list){
            return value
        }
        for (let i = 0; i < list.length; i++) {
            value.push({
                attributeId:list[i].id,
                name:list[i].name,
                zIndex:list[i].zIndex,
                traits:traitsRef.current[i]?.getValue()
            })
        }
        return  value
    },[list])
    useImperativeHandle(ref,()=>({
        getValue
    }),[getValue])
    return <Box>
        <EditAttribute onFinish={handleEditFinish} id={editId} visible={editVisible} onCancel={handleEditCancel}/>
        {list?.map(render)}
    </Box>
}
export default React.forwardRef<AttributesRef,AttributesProps>(Attributes);
