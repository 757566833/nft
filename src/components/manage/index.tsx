import React, {useCallback, useRef} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import AddAttribute from "@/components/manage/add/attribute";
import {useAttributes} from "@/http/attribute";
import Attributes, {AttributesRef} from "@/components/manage/attributes";
import TraitProvider from "@/components/manage/context/trait";
import AddTrait from "@/components/manage/add/trait";
import {func} from "@/utils";

const Manage: React.FC = () => {
    const {data, error, isValidating, mutate} = useAttributes()
    const attributesRef = useRef<AttributesRef>(null);
    const handlePreview = useCallback(()=>{
        console.log(attributesRef.current?.getValue())
        const value = attributesRef.current?.getValue()
        if(value){
            console.log(func(value))
        }

    },[])
    return <TraitProvider>
        <AddTrait />
        <Box marginTop={2}>
            <Box width={1000} margin={'0 auto'}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={2}>
                    <Typography fontWeight={"bold"} variant={'h3'}>Attributes</Typography>
                    <Stack direction={"row"} spacing={1} height={40}>
                        <AddAttribute onFinish={mutate}/>
                        <Button onClick={handlePreview} variant={"outlined"}>
                            Preview
                        </Button>
                    </Stack>
                </Box>
                <Attributes ref={attributesRef} list={data} loading={isValidating}/>
            </Box>
        </Box>
    </TraitProvider>
}
export default Manage;
