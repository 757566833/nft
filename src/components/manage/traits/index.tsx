import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from "react";
import {Box, Slider, Stack, Typography, Skeleton} from "@mui/material";
import {useTraits} from "@/http/trait";

const sum = (arr: (number | null)[]) => {
    let sum = 0;
    for (const num of arr) {
        sum += num || 0
    }
    return sum
}

const map: Record<number, string> = {
    0: 'Zero',
    25: 'Super Rare',
    50: 'Common',
    75: 'Often',
    100: 'Very Often'
}
const Traits: React.ForwardRefRenderFunction<{value:{url:string,name:string,num:number|null}[]},{ attributeId: number, total: number }> = (props,ref) => {
    const {attributeId, total} = props;
    const {data, error, isValidating, mutate} = useTraits(attributeId)
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
            return <Box borderColor={'#dde3e7'} border={'1px solid #dde3e7'} key={item.id} borderRadius={5} width={208}
                        height={328}>
                <Box height={206} width={206} overflow={"hidden"} borderRadius={5}>
                    <Box height={206} width={206} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                        backgroundImage: 'linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0),linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0);',
                        backgroundSize: '16px 16px',
                        backgroundPosition: '0 0,8px 8px'
                    }}>
                        <Box component={"img"} height={174} width={174}
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
    }, [data, handleChange, rates])
    useImperativeHandle(ref,()=> {
        const value:{url:string,name:string,num:number|null}[] = []
        if(!data){
            return {value}
        }
        for (let i = 0; i < data.length; i++) {
            value.push({
                url:data[i].url,
                name:data[i].name,
                num:itemsRef.current[i]
            })
        }
        return {value}
        // value:itemsRef.current
    },[data])
    return <Stack direction={"row"} width={'100%'} sx={{overflowX: 'auto'}} height={360} spacing={3} marginTop={3}>
        {isValidating && data?.length == 0 ? s : s2}
    </Stack>
}
export default React.forwardRef<{ value:{url:string,name:string,num:number|null}[] },{ attributeId: number, total: number }>(Traits);
