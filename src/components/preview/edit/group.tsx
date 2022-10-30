import React, {useMemo} from "react";
import {useAttributes} from "@/http/attribute";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Item from "@/components/preview/edit/item";
import {PreviewItem} from "@/context/preview";
import {ITrait} from "@/services/trait";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {useWallet} from "@/context/wallet";
import {LocalStorage} from "@/lib/react-context";

const {useLocalStorage} = LocalStorage

export const Group:React.FC<{preview:PreviewItem,onChange:(attributeId:number,item:ITrait)=>void}> = (props)=>{
    const {preview,onChange} = props
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    const {data} = useAttributes(current?.address)
    return <Box border={"1px solid #dde3e7"}>

        {data?.filter((item)=>item.id).map((item)=>{
            return <Accordion key={item.id} elevation={0} disableGutters={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Item attributeId={item.id} preview={preview} onChange={onChange}/>
                </AccordionDetails>
            </Accordion>
        })}
    </Box>
}
export default Group
