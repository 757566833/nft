import React from "react";
import {Box, Stack} from "@mui/material";
import Contract from "@/components/generate/contract/factory";
import Container from "@/components/generate/contract/container";
import List from "@/components/generate/contract/list";

export const Settings: React.FC = () => {
    return <Box marginTop={6}>
        <Box width={1000} margin={'0 auto'}>
            <Stack spacing={6}>
                <Contract/>
                <Container/>
                <List/>
            </Stack>

        </Box>
    </Box>
}
export default Settings;
