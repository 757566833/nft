import React, {useCallback, useMemo, useRef} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import AddAttribute from "@/components/manage/add/attribute";
import {useAttributes} from "@/http/attribute";
import Attributes, {AttributesRef} from "@/components/manage/attributes";
import TraitProvider from "@/components/manage/context/trait";
import AddTrait from "@/components/manage/add/trait";
import {func} from "@/utils";
import {usePreview} from "@/context/preview";
import {message} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";

const {useLocalStorage} = LocalStorage
const Manage: React.FC = () => {
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    const {data, error, isValidating, mutate} = useAttributes(current?.address)
    const attributesRef = useRef<AttributesRef>(null);
    const [,setPreview] = usePreview()


    const handlePreview = useCallback(()=>{
        const value = attributesRef.current?.getValue()

        if(value){
            for (const valueElement of value) {
                const length  = valueElement.traits?.map(item=>item.value).filter(item=>item).length
                if(length==0){
                    message.error(`${valueElement.name} must has value`)
                    return
                }
            }
            const list = func(value)
            setPreview(list)
        }

    },[setPreview])
    return <TraitProvider>
        <AddTrait />
        <Box marginTop={2}>
            <Box width={1000} margin={'0 auto'}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={2}>
                    <Typography fontWeight={"bold"} variant={'h3'}>Attributes</Typography>
                    <Stack direction={"row"} spacing={1} height={40}>
                        <AddAttribute onFinish={mutate}/>
                        <Button onClick={handlePreview} variant={"outlined"} disabled={!current}>
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
