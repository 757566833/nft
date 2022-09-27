import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Stack} from "@mui/material";
import {getTraits, ITrait} from "@/services";

export const Traits:React.FC<{attributeId:number,total:number}> = (props)=>{
    const {attributeId,total} = props;
    const [list,setList] = useState<ITrait[]>([])
    const [loading,setLoading] = useState(true);
    const getList = useCallback(async (attributeId:number)=>{
        setLoading(true)
       const res = await getTraits(attributeId)
        setLoading(false)
        if(res){
            setList(res)
        }

    },[])
    useEffect(()=>{
        if(attributeId){
            getList(attributeId)
        }
    },[attributeId, getList])
    console.log(loading,total)
    const s = useMemo(()=>{
        const array = new Array(total).fill('')
        return array.map((_,index)=><div key={index}>123</div>)
    },[total])
    const s2 = useMemo(()=>{
        return list.map((item)=>{
         return <Box borderColor={'#dde3e7'} border={'1px solid'} key={item.id} borderRadius={5} width={208} height={328}>
             <Box height={206} width={206}>
                 <Box component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
             </Box>
             <Box width={206} height={120}>

             </Box>
         </Box>
        })
    },[list])
    return <Stack direction={"row"} width={'100%'} overflow={"auto"} height={360} spacing={3}>
        {loading?s:s2}
    </Stack>
}
export default Traits;
