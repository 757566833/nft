import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Slider, Stack, Typography, Skeleton} from "@mui/material";
import {getTraits, ITrait} from "@/services";
import {auto} from "@popperjs/core";

const map: Record<number, string> = {
    0: 'Super Rare',
    25: 'Common',
    50: 'Often',
    75: 'Very Often',
    100: 'Very Often'
}
export const Traits: React.FC<{ attributeId: number, total: number }> = (props) => {
    const {attributeId, total} = props;
    const [list, setList] = useState<ITrait[]>([])
    const [loading, setLoading] = useState(true);
    const getList = useCallback(async (attributeId: number) => {
        setLoading(true)
        const res = await getTraits(attributeId)
        setLoading(false)
        if (res) {
            setList(res)
        }

    }, [])
    useEffect(() => {
        if(attributeId){
            getList(attributeId)
        }
    }, [attributeId, getList])
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
    const s2 = useMemo(() => {
        return list.map((item) => {
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
                        <Slider marks valueLabelDisplay="auto" step={25} valueLabelFormat={(number) => map[number]}/>
                    </Box>

                </Stack>
            </Box>
        })
    }, [list])
    return <Stack direction={"row"} width={'100%'} sx={{overflowX:'auto'}} height={360} spacing={3} marginTop={3}>
        {loading ? s : s2}
    </Stack>
}
export default Traits;
