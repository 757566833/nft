import React from "react";
import {Box, Stack} from "@mui/material";
import General from "@/components/settings/general";
import Contract from "@/components/settings/contract";
import Collection from "@/components/settings/collection";
import Count from "@/components/settings/count";

export const Settings: React.FC = () => {
    return <Box marginTop={6}>
        <Box width={1000} margin={'0 auto'}>
            <Stack spacing={6}>
                <General/>
                <Contract/>
                <Collection/>
                <Count/>
            </Stack>

        </Box>
    </Box>
}
export default Settings;
