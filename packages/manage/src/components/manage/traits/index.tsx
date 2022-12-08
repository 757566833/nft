import React, {
    Key,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from "react";
import {Box, Slider, Stack, Typography, Skeleton, Menu, MenuItem, IconButton} from "@mui/material";
import {useDelTrait, useTraits} from "@/http/trait";
import {sum} from "@/utils";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {Dropdown} from "@/lib/react-component";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";

const {useLocalStorage} = LocalStorage



const map: Record<number, string> = {
    0: 'Zero',
    25: 'Super Rare',
    50: 'Common',
    75: 'Often',
    100: 'Very Often'
}
export type TraitsRefValue = {attributeId:number,attributeName:string,traitId:number, url: string; name: string; value: number | null; }[]
export interface TraitsProps{
    attributeId: number,
    total: number
}
export interface TraitsRef{
    getValue: () => TraitsRefValue
}
const Traits: React.ForwardRefRenderFunction<TraitsRef,TraitsProps> = (props,ref) => {
    const {attributeId, total} = props;
    const [wallet] = useWallet();
    const {address,chainId} = wallet;
    const {data, isValidating} = useTraits({attributeId,chainId:chainId?.toString()})
    const [currentContract] = useLocalStorage<Record<number, IContract|null>>(CURRENT_CONTRACT,{})
    const s = useMemo(() => {
        const array = new Array(total).fill('')
        return array.map((_, index) => <Box key={index} border={'1px solid #dde3e7'} borderRadius={5} width={208}
                                            height={328}>
            <Skeleton>
                <Box height={206} width={206} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                    backgroundImage: 'linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0),linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0);',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0,8px 8px'
                }}>

                </Box>

            </Skeleton>
            <Stack width={206} height={120} padding={2} spacing={1}>
                <Skeleton>
                    <Typography fontWeight={"bold"}>item name</Typography>
                </Skeleton>
                <Skeleton width={200}>
                    <Box paddingLeft={1} paddingRight={1}>
                        <Slider marks valueLabelDisplay="auto" step={25} valueLabelFormat={(number) => map[number]}/>
                    </Box>
                </Skeleton>
            </Stack>
        </Box>)
    }, [total])
    const itemsRef = useRef<(number | null)[]>([]);
    // you can access the elements with itemsRef.current[n]

    useEffect(() => {
        if (data) {
            itemsRef.current = itemsRef.current.slice(0, data?.length);
        }

    }, [data]);

    const [rates, setRates] = useState<string[]>([])
    const [delTrait] = useDelTrait();
    const handleDelete = useCallback((id:number,attributeId:number)=>{
        delTrait(id,attributeId,chainId?.toString(),currentContract[chainId||0]?.address||'').then()
    },[chainId, currentContract, delTrait])
    const handleChange = useCallback(() => {
        const nums = itemsRef.current
        const numSum = sum(nums);
        const nextRates = [...rates]
        for (let i = 0; i < nums.length; i++) {
            if (numSum != 0) {
                nextRates[i] = (((nums[i] || 0) / numSum) * 100).toFixed(2)
            }else{
                nextRates[i]='0.00'
            }
        }
        setRates(nextRates)
    }, [rates])
    const s2 = useMemo(() => {

        return data?.map((item, index) => {
            const onChange = (e: Event, value: number | number[]) => {
                const items = itemsRef.current
                items[index] = value as number
                handleChange()
            }
            const handleAction =(e: React.MouseEvent<HTMLDivElement, MouseEvent>, key?: Key | null | undefined)=>{
                    switch (key) {
                        case "delete":
                            handleDelete(item.id,item.attributeId)
                            break
                    }
                }
            return <Box borderColor={'#dde3e7'} position={"relative"} border={'1px solid #dde3e7'} key={item.id} borderRadius={5} width={208}
                        height={328}>
                <Box position={"absolute"} right={6} top={6}>
                    <Dropdown onClick={handleAction} overlay={<Menu open={true}>
                        {/*<MenuItem key={'add'} data-name={item.name} data-id={item.id}>*/}
                        {/*    <Stack direction={"row"} spacing={1}>*/}
                        {/*        <ControlPointOutlinedIcon/> <Typography>Add traits</Typography>*/}
                        {/*    </Stack>*/}
                        {/*</MenuItem>*/}

                        {/*<MenuItem key={'edit'}>*/}
                        {/*    <Stack direction={"row"} spacing={1}>*/}
                        {/*        <EditOutlinedIcon/> <Typography>Edit Attribute</Typography>*/}
                        {/*    </Stack>*/}
                        {/*</MenuItem>*/}

                        <MenuItem key={'delete'}>
                            <Stack direction={"row"} spacing={1}>
                                <DeleteOutlineOutlinedIcon/> <Typography>Delete</Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>}>
                        <IconButton sx={{background:'white','&:hover':{background:'white'}}}>
                            <MoreHorizIcon/>
                        </IconButton>
                    </Dropdown>
                </Box>
                <Box sx={{
                    '&:hover': {
                        cursor: 'pointer',
                        background:'#eaeaea'
                    },
                    transition:'all 0.28s'
                }} height={206} width={206} overflow={"hidden"} borderRadius={5}>
                    <Box  height={206} width={206} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                        backgroundImage: 'linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0),linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0);',
                        backgroundSize: '16px 16px',
                        backgroundPosition: '0 0,8px 8px'
                    }}>
                        <Box component={"img"}
                             height={174}
                             width={174}
                             src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
                    </Box>

                </Box>
                <Stack width={206} height={120} padding={2} spacing={1}>
                    <Typography fontWeight={"bold"}>{item.name}</Typography>
                    <Box paddingLeft={1} paddingRight={1}>
                        <Slider onChange={onChange} marks valueLabelDisplay="auto" step={25}
                                valueLabelFormat={(number) => map[number]}/>
                    </Box>
                    <Box paddingLeft={1} paddingRight={1}>
                        <Typography variant={"body2"}>{rates[index] || "0.00"}%</Typography>
                    </Box>
                </Stack>
            </Box>
        })
    }, [data, handleChange, handleDelete, rates])
    const getValue = useCallback(()=>{
        const value:TraitsRefValue = []
        if(!data){
            return value
        }
        for (let i = 0; i < data.length; i++) {
            value.push({
                attributeId:data[i].attributeId,
                attributeName:data[i].attributeName,
                traitId:data[i].id,
                url:data[i].url,
                name:data[i].name,
                value:itemsRef.current[i]
            })
        }
        return value
    },[data])
    useImperativeHandle(ref,()=> ({
        getValue
    }),[getValue])
    return <Stack direction={"row"} width={'100%'} sx={{overflowX: 'auto'}} height={360} spacing={3} marginTop={3}>
        {isValidating && data?.length == 0 ? s : s2}
    </Stack>
}
export default React.forwardRef<TraitsRef,TraitsProps>(Traits);
