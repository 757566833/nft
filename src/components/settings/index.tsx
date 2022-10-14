import React from "react";
import {Box, Stack} from "@mui/material";
import General from "@/components/settings/general";
import Contract from "@/components/settings/contract";

export const Settings: React.FC = () => {
    return <Box marginTop={6}>
        <Box width={1000} margin={'0 auto'}>
            <Stack spacing={6}>
                <General/>
                <Contract/>
            </Stack>

        </Box>
    </Box>
}
export default Settings;
