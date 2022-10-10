import React, {useMemo} from "react";
import {Box} from "@mui/material";
import Filter from "@/components/preview/filter";
import FilterProvider from "@/components/preview/context/filter";
import List from "@/components/preview/list";
import CountProvider from "@/components/preview/context/count";

export const Preview: React.FC = () => {
    return <FilterProvider>
        <CountProvider>
        <Box display={"flex"}>
            <Box width={240} padding={2}>
                <Filter/>
            </Box>
            <Box flex={1} padding={2}>
               <List/>
            </Box>
        </Box>
        </CountProvider>
    </FilterProvider>
}
export default Preview
