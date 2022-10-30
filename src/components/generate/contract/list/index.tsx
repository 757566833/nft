import React, {Key, useCallback} from "react";
import {
    Box,
    Stack,
    Typography,
    Menu, MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useContracts} from "@/http/contract";
import {refreshContracts} from "@/services/contract";
import {Dropdown} from "@/lib/react-component";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const columns: GridColDef[] = [
    { field: 'address', headerName: 'address', width: 380 ,disableColumnMenu:true,sortable:false},
    { field: 'name', headerName: 'name', width: 120 ,disableColumnMenu:true,sortable:false},
    { field: 'chainId', headerName: 'chain_id', width: 120 ,disableColumnMenu:true,sortable:false},
    {
        field: 'symbol',
        headerName: 'symbol',
        width: 120,disableColumnMenu:true,sortable:false

    },
    {
        field: 'owner',
        headerName: 'owner',
        width: 380,disableColumnMenu:true,sortable:false
    }
];
export const List: React.FC = () => {
   const {data,mutate} =  useContracts()
    const handleReset = useCallback(async ()=>{
        await refreshContracts()
        await mutate()
    },[mutate])
    const handleClick =useCallback( (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key?: Key | null | undefined) => {
        switch (key) {
            case "reset":
                handleReset().then()
                break
            case "refresh":
                mutate().then()
                break
        }
    },[handleReset, mutate])
    return <Box>
        <Stack direction={"row"} spacing={1} alignItems={"center"} >
            <Typography variant={'h4'} fontWeight={"bold"}>List</Typography>
            <Dropdown onClick={handleClick} overlay={<Menu open={true}>
                <MenuItem key={'reset'}>
                    <Typography>clean and sync from chain</Typography>
                </MenuItem>
                <MenuItem key={'refresh'}>
                    <Typography>refresh</Typography>
                </MenuItem>
            </Menu>}>
                <Typography><MoreHorizIcon/></Typography>
            </Dropdown>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant={'body2'}>all contract</Typography>

        </Stack>
        <Box width={1000} height={400}>
            <DataGrid
                disableExtendRowFullWidth={true}
                rows={data||[]}
                getRowId={(row)=>row.address}
                columns={columns}
                hideFooterPagination={true}
                hideFooter={true}

            />
        </Box>



    </Box>
}
export default List;
