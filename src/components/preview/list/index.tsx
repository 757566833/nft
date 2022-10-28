import React, {useCallback, useEffect, useMemo} from "react";
import {Box, Typography} from "@mui/material";
import {PreviewItem, usePreview} from "@/context/preview";
import {useFilterValue} from "@/components/preview/context/filter";
import {intersection} from "@/utils";
import {useCountValue} from "@/components/preview/context/count";
import Edit from "@/components/preview/edit";
import {useEdit} from "@/components/preview/context/edit";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
import {useWallet} from "@/context/wallet";
const {useLocalStorage} = LocalStorage

export const List: React.FC = () => {
    const [preview] = usePreview();
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [filterValue] = useFilterValue();
    const [, setCountValue] = useCountValue()
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    useEffect(() => {
        const map: Record<number, number> = {}
        for (let i = 0; i < preview.length; i++) {
            const group = preview[i];
            for (let j = 0; j < group.length; j++) {
                if (map[group[j].traitId]) {
                    map[group[j].traitId] = map[group[j].traitId] + 1
                } else {
                    map[group[j].traitId] = 1
                }
            }
        }
        setCountValue(map)
    }, [preview, setCountValue])
    const [,setEdit] = useEdit()

    const handleChange = useCallback((group:PreviewItem,index:number)=>{
        setEdit({
            visible:true,
            value:{
                index,
                data:group
            }
        })
    },[setEdit])
    return <>
        <Edit/>
        {preview.filter(item => filterValue.length > 0 ? intersection(filterValue, item.map(i => i.traitId)).length > 0 : true).map((group, index) => {
            return <Box
                sx={{
                    '&:hover': {
                        boxShadow: '0px 0px 10px  #b5b5b5',
                        cursor: 'pointer'
                    }
                }}
                border={"1px solid #dde3e7"}
                display={"inline-block"}
                margin={2}
                key={index}
                width={240}
                height={288}
                borderRadius={3}
                overflow={"hidden"}
                onClick={()=>handleChange(group,index)}
            >
                <Box width={240} height={240} position={"relative"}>
                    {group.map((item, index) => {
                        return <Box key={index} width={240} height={240} position={"absolute"}
                                    zIndex={item.zIndex}
                                    component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
                    })}
                </Box>
                <Box paddingLeft={2} paddingTop={1} paddingBottom={1} paddingRight={2}>
                    <Typography lineHeight={2}>{current?.name} {index}</Typography>
                </Box>
            </Box>
        })}
    </>
}
export default List
