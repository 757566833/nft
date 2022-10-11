import React from "react";
import {useAttributes} from "@/http/attribute";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Item from "@/components/preview/edit/item";
import {PreviewItem} from "@/context/preview";
import {ITrait} from "@/services";

export const Group:React.FC<{preview:PreviewItem,onChange:(attributeId:number,item:ITrait)=>void}> = (props)=>{
    const {preview,onChange} = props
    const {data, error, isValidating, mutate} = useAttributes()
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
