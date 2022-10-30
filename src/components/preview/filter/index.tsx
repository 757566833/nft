import React, {useMemo} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import {useAttributes} from "@/http/attribute";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckboxGroup from "@/components/preview/filter/checkboxGroup";
import {usePreview} from "@/context/preview";
import {useWallet} from "@/context/wallet";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";

const {useLocalStorage} = LocalStorage

export const Filter:React.FC = ()=>{
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
    const [preview] = usePreview();
    return <Box border={"1px solid #dde3e7"} hidden={preview.length==0}>

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
                    <CheckboxGroup attributeId={item.id}/>
                </AccordionDetails>
            </Accordion>
        })}
    </Box>
}
export default Filter
