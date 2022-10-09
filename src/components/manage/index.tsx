import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import AddAttribute from "@/components/manage/add/attribute";
import {useAttributes} from "@/http/attribute";
import Attributes from "@/components/manage/attributes";
import TraitProvider from "@/components/manage/context/trait";
import AddTrait from "@/components/manage/add/trait";

const Manage: React.FC = () => {
    const {data, error, isValidating, mutate} = useAttributes()
    return <TraitProvider>
        <AddTrait />
        <Box marginTop={2}>
            <Box width={1000} margin={'0 auto'}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={2}>
                    <Typography fontWeight={"bold"} variant={'h3'}>Attributes</Typography>
                    <Stack direction={"row"} spacing={1} height={40}>
                        <AddAttribute onFinish={mutate}/>
                        <Button variant={"outlined"}>
                            Preview
                        </Button>
                    </Stack>
                </Box>
                <Attributes list={data} loading={isValidating}/>
            </Box>
        </Box>
    </TraitProvider>
}
export default Manage;
