import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import {Modal} from "@/lib/react-component";
import {useForm} from "react-hook-form";
import {useAddAttribute} from "@/http/attribute";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";

const {useLocalStorage} = LocalStorage

interface add {
    name: string,
    zIndex: number
}

const defaultParam: add = {
    name: '',
    zIndex: 1
}
const AddAttribute: React.FC<{ onFinish: () => void }> = (props) => {
    const {onFinish} = props
    const [addAttribute] = useAddAttribute()
    const {register, handleSubmit,  reset} = useForm<add>({defaultValues: defaultParam});

    const [addVisible, setAddVisible] = useState(false)
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return null
    }, [chainId, currentContract])
    const handleOpenAdd = useCallback(() => {
        setAddVisible(true)
    }, [])
    const handleCloseAdd = useCallback(() => {
        setAddVisible(false)
    }, [])
    const handleAdd = useCallback(async (data: add) => {
        if(current){
            const res = await addAttribute({
                ...data,
                zIndex: Number.parseInt(`${data.zIndex}`),
                contract:current.address
            })
            setAddVisible(false)
            if (res) {
                onFinish()
            }
        }

    }, [addAttribute, current, onFinish])
    useEffect(() => {
        if (!addVisible) {
            reset()
        }

    }, [addVisible, reset])

    return <>
        <Modal title={'add attribute'} keepMounted={true} open={addVisible} onCancel={handleCloseAdd}
               onOk={handleSubmit(handleAdd)}>
            <Stack width={280} padding={1} spacing={2}>
                <TextField fullWidth={true} label={'name'} {...register("name")}/>
                <TextField type={"number"} fullWidth={true} label={'zIndex'} {...register("zIndex")}/>
            </Stack>

        </Modal>
        <Button variant={"outlined"} onClick={handleOpenAdd} disabled={!current}>
            new attribute
        </Button>
    </>
}
export default AddAttribute;
