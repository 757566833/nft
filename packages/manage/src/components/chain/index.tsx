import React from "react";
import {Box, Stack} from "@mui/material";
import General from "@/components/chain/general";
import Eth from "@/components/chain/eth";
import Add from "@/components/market/add";

export const Chain: React.FC = () => {
    return <Box marginTop={6}>
        <Box width={1000} margin={'0 auto'}>
            <Stack spacing={6}>
                <General/>
                <Eth/>
                <Add/>
            </Stack>

        </Box>
    </Box>
}
export default Chain;
