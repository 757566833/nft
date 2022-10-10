import React, {useEffect} from "react";
import {Box, Typography} from "@mui/material";
import {usePreview} from "@/context/preview";
import {useFilterValue} from "@/components/preview/context/filter";
import {intersection} from "@/utils";
import {useCountValue} from "@/components/preview/context/count";

export const List: React.FC = () => {
    const [preview] = usePreview();
    const [filterValue] = useFilterValue();
    const [,setCountValue] = useCountValue()
    useEffect(()=>{
        const map:Record<number, number>={}
        for (let i = 0; i < preview.length; i++) {
            const group = preview[i];
            for (let j = 0; j < group.length; j++) {
                if(map[group[j].traitId]){
                    map[group[j].traitId] = map[group[j].traitId]+1
                }else {
                    map[group[j].traitId] = 1
                }
            }
        }
        setCountValue(map)
    },[preview, setCountValue])
    return <>
        {preview.filter(item=>filterValue.length>0?intersection(filterValue,item.map(i=>i.traitId)).length>0:true).map((group, index) => {
            return <Box border={"1px solid #dde3e7"} display={"inline-block"} margin={2} key={index} width={240}
                        height={288} borderRadius={3} overflow={"hidden"}>
                <Box width={240} height={240} position={"relative"}>
                    {group.map((item, index) => {
                        return <Box key={index} width={240} height={240} position={"absolute"}
                                    zIndex={item.zIndex}
                                    component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
                    })}
                </Box>
                <Box paddingLeft={2} paddingTop={1} paddingBottom={1} paddingRight={2}>
                    <Typography lineHeight={2}>demo {index}</Typography>
                </Box>
            </Box>
        })}
    </>
}
export default List
