import React from "react";
import {Box, Stack} from "@mui/material";
import Filter from "@/components/preview/filter";
import FilterProvider from "@/components/preview/context/filter";
import List from "@/components/preview/list";
import CountProvider from "@/components/preview/context/count";
import EditProvider from "@/components/preview/context/edit";
import Download from "@/components/preview/download";
import Upload from "@/components/preview/upload";
import Batch from "@/components/preview/batch";

export const Preview: React.FC = () => {

    return <FilterProvider>
        <CountProvider>
            <EditProvider>
                <Box display={"flex"}>
                    <Stack width={240} padding={2} spacing={3}>
                        <Filter/>
                        <Download/>
                        <Upload/>
                        <Batch/>
                    </Stack>
                    <Box flex={1} padding={2}>
                        <List/>
                    </Box>
                </Box>
            </EditProvider>
        </CountProvider>
    </FilterProvider>
}
export default Preview
