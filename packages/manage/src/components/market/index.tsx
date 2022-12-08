import React from "react";
import {Box, Stack} from "@mui/material";
import General from "@/components/market/general";
import List from "@/components/market/list";
import Add from "@/components/market/add";

export const Settings: React.FC = () => {
    return <Box marginTop={6}>
        <Box width={1000} margin={'0 auto'}>
            <Stack spacing={6}>
                <General/>
                <List/>
                <Add/>
            </Stack>

        </Box>
    </Box>
}
export default Settings;
