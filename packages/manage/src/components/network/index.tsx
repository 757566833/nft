import React from "react";
import {Box, Stack} from "@mui/material";
import General from "@/components/network/general";
import Eth from "@/components/network/eth";

export const Network: React.FC = () => {
    return <Box marginTop={6}>
        <Box width={1000} margin={'0 auto'}>
            <Stack spacing={6}>
                <General/>
                <Eth/>
            </Stack>

        </Box>
    </Box>
}
export default Network;
