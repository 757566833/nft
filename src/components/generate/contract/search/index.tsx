import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Card, Stack, TextField, Typography, IconButton,Accordion,AccordionSummary,AccordionDetails} from "@mui/material";
import {useForm} from "react-hook-form";
import Provider from "@/instance/provider";
import {message} from "@/lib/util";
import {useWallet} from "@/context/wallet";
import {CONTRACT_ADDRESS} from "@/constant/contract";
import {GetErc721, GetErc721Factory} from "@/contract";
import {Refresh,ExpandMore} from "@mui/icons-material"

export interface ISearchContract {
    index: string,
}

const defaultParam: ISearchContract = {
    index: "",
}
export const Search: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        reset
    } = useForm<ISearchContract>({defaultValues: defaultParam});
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [erc721Address, setErc721Address] = useState("");
    const [erc721name, setErc721Name] = useState("");
    const [erc721Symbol, setErc721Symbol] = useState("");
    const [erc721Owner, setErc721Owner] = useState("");
    const [total,setTotal] = useState("");
    const handleSearch = useCallback(async (data: ISearchContract) => {
        const provider = await Provider.getInstance();
        if (!provider || !chainId) {
            return message.info("未安装metamask")
        }

        const contractAddress = CONTRACT_ADDRESS[chainId]
        if (!contractAddress) {
            return message.info("不支持")
        }
        const erc721Factory = await GetErc721Factory(contractAddress);
        if (erc721Factory) {
            try {
                const erc721Address = await erc721Factory.allErc721(BigInt(data.index))
                setErc721Address(erc721Address)
                setErc721Name("")
                setErc721Symbol("")
                setErc721Owner("")
            }catch (e) {
                message.error("合约不存在")
            }

        }
    }, [chainId])
    const getName = useCallback(async () => {
        if (!erc721Address) {
            return
        }
        const erc721 = await GetErc721(erc721Address)
        if (erc721) {
            const name = await erc721.name()
            setErc721Name(name)
        }
    }, [erc721Address])
    const getSymbol = useCallback(async () => {
        if (!erc721Address) {
            return
        }
        const erc721 = await GetErc721(erc721Address)
        if (erc721) {
            const symbol = await erc721.symbol()
            setErc721Symbol(symbol)
        }
    }, [erc721Address])
    const getOwner = useCallback(async () => {
        if (!erc721Address) {
            return
        }
        const erc721 = await GetErc721(erc721Address)
        if (erc721) {
            const owner = await erc721.owner()
            setErc721Owner(owner)
        }
    }, [erc721Address])
    const getTotal = useCallback(async ()=>{

        const provider = await Provider.getInstance();
        if(!provider||!chainId){
            return
        }
        const contractAddress = CONTRACT_ADDRESS[chainId]
        if (!contractAddress) {
            return message.info("不支持")
        }
        const erc721Factory = await GetErc721Factory(contractAddress);
        if (erc721Factory) {
            try {
                const total = await erc721Factory.allErc721Length()
                setTotal(total.toString())
            }catch (e) {
                message.error("合约不存在")
            }

        }
    },[chainId])
    useEffect(()=>{
        getTotal().then()
    },[getTotal])
    const handleSync = useCallback(()=>{

    },[])
    return <Box>
        <Typography variant={'h4'} fontWeight={"bold"}>Search</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant={'body2'}>get Erc721 info by index. total {total} </Typography>
            <IconButton size={"small"} onClick={getTotal}>
                <Refresh/>
            </IconButton>
        </Stack>
        <Stack width={484} padding={1} spacing={2} marginTop={1}>
            <TextField type={"number"} fullWidth={true} label={'index'} {...register("index", {required: true})}/>
            <Button variant={"contained"} onClick={handleSubmit(handleSearch)}>search</Button>
        </Stack>
        <Box paddingLeft={1} paddingRight={1}>
            <Accordion elevation={0} variant={"outlined"} disableGutters={true} sx={{width:466}}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>{erc721Address}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={1}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Box display={"flex"}>
                                <Typography variant={"body2"} width={68}>
                                    name:
                                </Typography>
                                <Typography variant={"body2"}>
                                    {erc721name}
                                </Typography>
                            </Box>

                            <IconButton onClick={getName}>
                                <Refresh/>
                            </IconButton>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Box display={"flex"}>
                                <Typography variant={"body2"} width={68}>
                                    symbol:
                                </Typography>
                                <Typography variant={"body2"}>
                                    {erc721Symbol}
                                </Typography>
                            </Box>
                            <IconButton onClick={getSymbol}>
                                <Refresh/>
                            </IconButton>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Box display={"flex"}>
                                <Typography variant={"body2"} width={68}>
                                    owner:
                                </Typography>
                                <Typography variant={"body2"}>
                                    {erc721Owner}
                                </Typography>
                            </Box>
                            <IconButton onClick={getOwner}>
                                <Refresh/>
                            </IconButton>
                        </Box>
                        <Box>
                            <Button variant={"outlined"} size={"small"}>sync</Button>
                        </Box>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>


    </Box>
}
export default Search;
