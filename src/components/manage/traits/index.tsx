import React, {useCallback, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {Box, Slider, Stack, Typography, Skeleton} from "@mui/material";
import {getTraits, ITrait} from "@/services";
import {auto} from "@popperjs/core";
import {useTraits} from "@/http/trait";

const sum = (arr:number[])=>{
    let sum = 0;
    for (const num of arr) {
        sum+=num
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
export const Traits: React.FC<{ attributeId: number, total: number }> = (props) => {
    const {attributeId, total} = props;
    const {data, error, isValidating, mutate} =  useTraits(attributeId)
    const [values,setValues] = useState<number[]>([])
    useEffect(()=>{
        if(data){
            setValues(new Array(data.length).fill(0))
        }
    },[data])
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
    const handleChange = useCallback((value:number,index:number)=>{
        const nextValue = [...values]
        nextValue[index] = value;
        setValues(nextValue)
    },[values])
    const s2 = useMemo(() => {

        return data?.map((item,index) => {
            const onChange = (event: Event, value: number | number[], activeThumb: number)=>{
                handleChange(value as number,index)
            }
            const numSum = sum(values);
            let rate = '0.00'
            if(numSum!=0){
                rate = ((values[index] / numSum)*100).toFixed(2)
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
                        <Slider value={values[index]} onChange={onChange} marks valueLabelDisplay="auto" step={25} valueLabelFormat={(number) => map[number]}/>
                    </Box>
                    <Box paddingLeft={1} paddingRight={1}>
                        <Typography variant={"body2"}>{rate}%</Typography>
                    </Box>
                </Stack>
            </Box>
        })
    }, [data, handleChange, values])
    // useImperativeHandle(ref,()=>{
    //
    // },[])
    return <Stack direction={"row"} width={'100%'} sx={{overflowX:'auto'}} height={360} spacing={3} marginTop={3}>
        {isValidating&&data?.length==0 ? s : s2}
    </Stack>
}
export default Traits;
