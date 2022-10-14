import React, {useCallback, useMemo} from "react";
import {Box, Button, Stack} from "@mui/material";
import Filter from "@/components/preview/filter";
import FilterProvider from "@/components/preview/context/filter";
import List from "@/components/preview/list";
import CountProvider from "@/components/preview/context/count";
import EditProvider from "@/components/preview/context/edit";
import {generateImage} from "@/utils";
import Download from "@/components/preview/download";
import Upload from "@/components/preview/upload";

export const Preview: React.FC = () => {

    return <FilterProvider>
        <CountProvider>
            <EditProvider>
                <Box display={"flex"}>
                    <Stack width={240} padding={2} spacing={3}>
                        <Filter/>
                        <Download/>
                        <Upload/>
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
