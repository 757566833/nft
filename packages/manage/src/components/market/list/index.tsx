import React from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useCategories} from "@/http/category";
import {Refresh} from "@mui/icons-material";
const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 200 ,disableColumnMenu:true,sortable:false},
    { field: 'name', headerName: 'name', width: 200 ,disableColumnMenu:true,sortable:false},
    { field: 'icon', headerName: 'icon', width: 198 ,disableColumnMenu:true,sortable:false},
];
export const List:React.FC = ()=>{
    const {data,mutate} = useCategories();
    return <Stack direction={'column'} spacing={2}>
        <Box>
            <Stack direction={"row"}>
                <Typography variant={'h4'} fontWeight={"bold"}>List</Typography>
                <IconButton onClick={()=>mutate()}>
                    <Refresh/>
                </IconButton>
            </Stack>
            <Typography variant={'body2'}>all category.</Typography>
        </Box>

        <Box height={400} width={600}>
            <DataGrid
                disableExtendRowFullWidth={true}
                rows={data||[]}
                columns={columns}
                getRowId={(row)=>row.id}
                hideFooterPagination={true}
                hideFooter={true}
            />
        </Box>

    </Stack>
}
export default List;
