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
import {CURRENT_CONTRACT, PREVIEW_COUNT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
import {useMount, useUnmount} from "@/lib/react-hook";

const {useLocalStorage} = LocalStorage
const Manage: React.FC = () => {
    const workerRef = useRef<Worker>()
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    const {data, isValidating, mutate} = useAttributes({contractId:current?.id})
    const attributesRef = useRef<AttributesRef>(null);
    const [,setPreview] = usePreview()
    const [count] = useLocalStorage<string>(PREVIEW_COUNT,"100")

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
            message.info("generating")
            // const start = new Date().getTime();
            console.log(workerRef.current)
            workerRef.current?.postMessage(JSON.stringify({
                value,
                count
            }))
            // const list = func(value,Number.parseInt(count))
            // const end = new Date().getTime();
            // console.log(end - start)
            // setPreview(list)
        }

    },[count])
    useMount(()=>{
        workerRef.current = new Worker(new URL('@/worker/shuffle.ts', import.meta.url))
        workerRef.current.onmessage = (event: MessageEvent<string>) =>{
            const list = JSON.parse(event.data)
            setPreview(list)
        }
    })
    useUnmount(()=>{
        workerRef.current?.terminate()
    })
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
