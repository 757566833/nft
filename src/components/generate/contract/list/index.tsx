import React, {useCallback, useEffect, useState} from "react";
import {
    Box,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Refresh, ExpandMore} from "@mui/icons-material"
import {useContracts} from "@/http/contract";
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
   const {data,error,isValidating,mutate} =  useContracts()
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>List</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant={'body2'}>all contract</Typography>
            <IconButton size={"small"}>
                <Refresh/>
            </IconButton>
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
