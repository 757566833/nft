import React, { useMemo} from "react";
import {useTraits} from "@/http/trait";
import {Box, Stack} from "@mui/material";
import {PreviewItem} from "@/context/preview";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {ITrait} from "@/services/trait";
import {useWallet} from "@/context/wallet";
export const Item:React.FC<{attributeId: number,preview:PreviewItem,onChange:(attributeId:number,item:ITrait)=>void}> = (props)=>{
    const [wallet] = useWallet()
    const {chainId} = wallet;
    const {attributeId,preview,onChange} = props;
    const {data} = useTraits({attributeId,chainId:chainId?.toString()})
    const idList = useMemo(()=>{
        return preview.map(item=>item.traitId)
    },[preview])
    return<Stack spacing={1}>
        {data?.map(item=>{
            return  <Box
                key={item.id}
                border={"1px solid #dde3e7"}
                padding={1} borderRadius={1}
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
            >
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{userSelect:'none'}} onClick={()=>onChange(attributeId,item)}>
                    <Box width={48} height={48} component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`} sx={{userSelect:'none'}}/>
                    <Box sx={{userSelect:'none'}}>{idList.includes(item.id)?<CheckOutlinedIcon/>:''}</Box>
                </Box>
            </Box>
        })}
    </Stack>
}
export default Item;
